export const EXTRACTION_PROMPT = `You are extracting food and nutrition data from a daily tracking screenshot.

TASK: Extract ONLY the food-related sections (Breakfast, Lunch, Dinner, Snacks, Supplements) from the image and output them as markdown tables.

IMPORTANT RULES:
- SKIP the "Biometrics" section entirely (walks, activities, heart rate, etc.)
- Only include sections that contain food, drinks, or supplements
- Preserve the exact item names as shown
- Include the macro summary line below each section header

OUTPUT FORMAT:

First, output a Totals section that sums ALL macros from all food sections:

#### Totals
[sum of all kcal] kcal • [sum of all protein] g protein • [sum of all carbs] g carbs • [sum of all fat] g fat

Then, for each food section found, output in this exact format:

#### [Section Name]
[X] kcal • [X] g protein • [X] g carbs • [X] g fat

| Time  | Item                    | Quantity | Unit   | Calories   |
| ----- | ----------------------- | -------- | ------ | ---------- |
| HH:MM | Item name as shown      | [number] | [unit] | [X] kcal   |

NOTES:
- The Totals section must be FIRST and sum all macros from Breakfast + Lunch + Dinner + Snacks + Supplements
- Use the exact macro summary shown in each section header
- Time should be in HH:MM format
- Calories should include "kcal" suffix
- Preserve original unit text (g, ml, serving, tablet, capsule, etc.)
- If a section is empty or not present, skip it entirely
- Output sections in order: Totals, Breakfast, Lunch, Dinner, Snacks, Supplements

Output ONLY the markdown tables, no explanations or additional text.`;
