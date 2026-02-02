export const EXTRACTION_PROMPT = `You are extracting food and nutrition data from a daily tracking screenshot.

TASK: Extract ONLY the food-related sections (Breakfast, Lunch, Dinner, Snacks, Supplements) from the image and output them as markdown tables.

IMPORTANT RULES:
- SKIP the "Biometrics" section entirely (walks, activities, heart rate, etc.)
- Only include sections that contain food, drinks, or supplements
- Preserve the exact item names as shown
- Include the macro summary line below each section header

OUTPUT FORMAT:
For each food section found, output in this exact format:

#### [Section Name]
[X] kcal • [X] g protein • [X] g carbs • [X] g fat

| Time  | Item                    | Quantity | Unit   | Calories   |
| ----- | ----------------------- | -------- | ------ | ---------- |
| HH:MM | Item name as shown      | [number] | [unit] | [X] kcal   |

NOTES:
- Use the exact macro summary shown in the section header
- Time should be in HH:MM format
- Calories should include "kcal" suffix
- Preserve original unit text (g, ml, serving, tablet, capsule, etc.)
- If a section is empty or not present, skip it entirely
- Output sections in order: Breakfast, Lunch, Dinner, Snacks, Supplements

Output ONLY the markdown tables, no explanations or additional text.`;
