Chef's Menu Manager
1. project description 

A mobile app built with React Native and Expo that lets a chef build and manage a restaurant menu. The application is designed to help a restaurant chef manage menu items digitally. The application allows the chef to add, view and edit dishes.

2. Application features
- Menu management 
- edit existing dishes
- delete dishes with a confirmation message
- search for menu items by dish name

3. Technologies Used
- React Native
- Expo
- @react-native-picker/picker (category dropdown)
- expo-image-picker (dish photos)
- @expo/vector-icons (icons)

4. Menu categories 
- Starter
- Main
- Dessert

5. Design Decisions and Improvements
- Reusable components: buttons, form fields, badges, cards and dialogs are shared across screens instead of being repeated.
- Reusable functions: validation, filtering, statistics and price formatting live in src/utils/menu.js, so screens stay simple.
- Clear organisation: screens, components, utilities and constants each have their own folder; App.js holds only state and navigation.
- Derived data: the filtered list and statistics are recalculated automatically whenever the menu changes, so the screens always stay up to date.
- Validation: name and description need a minimum length, the category is required, and the price must be a valid number above zero (e.g. 85 or 85.50). Errors clear as the user types.
- Cross-platform delete dialog: a custom confirmation dialog is used because Alert.alert buttons do not work on web.