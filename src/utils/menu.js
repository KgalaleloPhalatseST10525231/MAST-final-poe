import { COURSES } from '../constants/theme';

const PRICE_PATTERN = /^\d+([.,]\d{1,2})?$/;

/** Formats a number as South African Rand, e.g. 89 -> "R89.00". */
export const formatPrice = (value) => `R${Number(value).toFixed(2)}`;

/** Converts user price text ("85,50" or "85.50") to a number. */
export const parsePrice = (text) => parseFloat(String(text).trim().replace(',', '.'));

/** "Today, 09:24" style time stamp for the activity feed. */
export const formatActivityTime = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `Today, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/**
 * Validates the add/edit form values.
 * Returns { field: message }; an empty object means the form is valid.
 */
export const validateMenuItem = ({ name, description, course, price }) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter the dish name.';
  else if (name.trim().length < 2) errors.name = 'Dish name must be at least 2 characters.';

  if (!description.trim()) errors.description = 'Please enter a description.';
  else if (description.trim().length < 5)
    errors.description = 'Description must be at least 5 characters.';

  if (!course) errors.course = 'Please select a category.';

  const trimmed = price.trim();
  if (!trimmed) errors.price = 'Please enter a price.';
  else if (!PRICE_PATTERN.test(trimmed))
    errors.price = 'Price must be a valid number, e.g. 85 or 85.50.';
  else if (parsePrice(trimmed) <= 0) errors.price = 'Price must be greater than 0.';

  return errors;
};

/** Returns items matching the search text (by name) and the selected course. */
export const filterMenuItems = (items, searchText, course) => {
  const query = searchText.trim().toLowerCase();
  return items.filter(
    (item) =>
      (!course || item.course === course) &&
      (!query || item.name.toLowerCase().includes(query))
  );
};

/** Total items, unavailable count, average price and a per-course count. */
export const calculateStats = (items) => {
  const total = items.length;
  const sum = items.reduce((acc, item) => acc + item.price, 0);
  return {
    total,
    unavailable: items.filter((item) => !item.available).length,
    average: total === 0 ? 0 : sum / total,
    perCourse: COURSES.map((course) => ({
      course,
      count: items.filter((item) => item.course === course).length,
    })),
  };
};
