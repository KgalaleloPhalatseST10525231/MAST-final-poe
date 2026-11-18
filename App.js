import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, BackHandler, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { COLORS } from './src/constants/theme';
import { filterMenuItems, calculateStats, formatActivityTime } from './src/utils/menu';
import TabBar from './src/components/TabBar';
import ConfirmDialog from './src/components/ConfirmDialog';
import MessageBanner from './src/components/MessageBanner';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import DetailScreen from './src/screens/DetailScreen';
import ItemFormScreen from './src/screens/ItemFormScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const ANDROID_TOP = Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0;

export default function App() {
  const [tab, setTab] = useState('home'); // 'home' | 'menu' | 'settings'
  // Screens pushed on top of the tabs: { name: 'detail' | 'form', id? }
  const [stack, setStack] = useState([]);
  const [items, setItems] = useState([]);
  const [activity, setActivity] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null); // item | 'all'
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }
  const timer = useRef(null);

  const current = stack.length ? stack[stack.length - 1] : null;
  const currentItem = current?.id ? items.find((i) => i.id === current.id) : null;

  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 3000);
  }, []);

  const logActivity = (kind, name) =>
    setActivity((prev) => [
      { id: `${Date.now()}-${Math.random()}`, kind, name, time: formatActivityTime(new Date()) },
      ...prev,
    ]);

  // Derived data recalculates automatically whenever items / search / filter change.
  const visibleItems = useMemo(
    () => filterMenuItems(items, searchText, courseFilter),
    [items, searchText, courseFilter]
  );
  const stats = useMemo(() => calculateStats(items), [items]);

  // ---- navigation -------------------------------------------------------
  const push = (screen) => setStack((prev) => [...prev, screen]);
  const pop = useCallback(() => setStack((prev) => prev.slice(0, -1)), []);
  const changeTab = (next) => { setStack([]); setTab(next); };

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length) { pop(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [stack.length, pop]);

  // ---- actions ----------------------------------------------------------
  const saveItem = (data) => {
    if (currentItem) {
      setItems((prev) => prev.map((i) => (i.id === currentItem.id ? { ...i, ...data } : i)));
      logActivity('updated', data.name);
      showMessage(`"${data.name}" was updated.`);
      pop(); // back to wherever the edit was started from
    } else {
      setItems((prev) => [{ id: Date.now().toString(), ...data }, ...prev]); // newest first
      logActivity('added', data.name);
      showMessage(`"${data.name}" was added to the menu.`);
      setStack([]);
      setTab('menu');
    }
  };

  const confirmDelete = () => {
    if (pendingDelete === 'all') {
      setItems([]);
      showMessage('The entire menu was cleared.', 'error');
    } else {
      const removed = pendingDelete;
      setItems((prev) => prev.filter((i) => i.id !== removed.id));
      logActivity('deleted', removed.name);
      showMessage(`"${removed.name}" was deleted.`, 'error');
    }
    setPendingDelete(null);
    setStack([]);
    if (pendingDelete !== 'all') setTab('menu');
  };

  const clearFilters = () => { setSearchText(''); setCourseFilter(''); };
  const openAdd = () => push({ name: 'form' });

  // ---- render -----------------------------------------------------------
  let screen;
  if (current?.name === 'detail') {
    screen = (
      <DetailScreen
        item={currentItem}
        onBack={pop}
        onEdit={(item) => push({ name: 'form', id: item.id })}
        onDelete={setPendingDelete}
      />
    );
  } else if (current?.name === 'form') {
    screen = (
      <ItemFormScreen
        key={current.id || 'new'}
        item={currentItem}
        onSave={saveItem}
        onCancel={pop}
        onError={(text) => showMessage(text, 'error')}
      />
    );
  } else if (tab === 'home') {
    screen = <HomeScreen stats={stats} activity={activity} onAdd={openAdd} onViewAll={() => changeTab('menu')} />;
  } else if (tab === 'menu') {
    screen = (
      <MenuScreen
        items={items}
        visibleItems={visibleItems}
        searchText={searchText}
        courseFilter={courseFilter}
        onSearchChange={setSearchText}
        onCourseChange={setCourseFilter}
        onClearFilters={clearFilters}
        onOpenItem={(item) => push({ name: 'detail', id: item.id })}
        onAdd={openAdd}
      />
    );
  } else {
    screen = <SettingsScreen itemCount={items.length} onClearMenu={() => setPendingDelete('all')} />;
  }

  const showTabs = !current;
  const deleteAll = pendingDelete === 'all';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView style={[styles.top, { paddingTop: ANDROID_TOP }]} />
      <View style={styles.content}>
        {screen}
        <MessageBanner message={message} />
      </View>
      {showTabs && (
        <SafeAreaView style={styles.bottom}>
          <TabBar active={tab} onChange={changeTab} />
        </SafeAreaView>
      )}

      <ConfirmDialog
        visible={!!pendingDelete}
        title={deleteAll ? 'Clear entire menu?' : 'Delete menu item?'}
        message={
          deleteAll
            ? 'All menu items will be permanently removed.'
            : pendingDelete ? `"${pendingDelete.name}" will be permanently removed from the menu.` : ''
        }
        confirmLabel={deleteAll ? 'Clear All' : 'Delete'}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  top: { backgroundColor: COLORS.navy },
  content: { flex: 1 },
  bottom: { backgroundColor: COLORS.card },
});
