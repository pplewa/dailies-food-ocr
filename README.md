# dailies-food-ocr

Fast and cheap CLI to extract food tracking tables from screenshots using Google Gemini Flash.

## Installation

```bash
npm install -g dailies-food-ocr
```

Or use directly with npx:

```bash
npx dailies-food-ocr image.jpg
```

## Setup

Set your Gemini API key:

```bash
# Option 1: Environment variable
export GEMINI_API_KEY=your_api_key

# Option 2: Create .env file in your working directory
echo "GEMINI_API_KEY=your_api_key" > .env
```

Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey).

## Usage

### CLI

```bash
# Single image to stdout
dailies-food-ocr screenshot.jpg

# Output to file
dailies-food-ocr screenshot.jpg -o output.md

# Multiple images
dailies-food-ocr image1.jpg image2.jpg -o combined.md

# With API key flag
dailies-food-ocr screenshot.jpg -k YOUR_API_KEY

# With model

dailies-food-ocr screenshot.jpg -m gemini-2.5-flash-lite
```

### Programmatic

```typescript
import { extractFoodTable } from "dailies-food-ocr";

const markdown = await extractFoodTable(["screenshot.jpg"]);
console.log(markdown);

// With options
const result = await extractFoodTable(["image.jpg"], {
  apiKey: "your_api_key",
  model: "gemini-3-flash-preview", // default
});
```

## Output Format

Extracts food sections (Breakfast, Lunch, Dinner, Snacks, Supplements) as markdown tables:

```markdown
#### Breakfast
624 kcal • 88 g protein • 24 g carbs • 17 g fat

| Time  | Item                 | Quantity | Unit | Calories  |
| ----- | -------------------- | -------- | ---- | --------- |
| 07:00 | Yogurt, Plain        | 150      | g    | 94.5 kcal |
| 07:00 | Egg Whites, Cooked   | 200      | g    | 110 kcal  |
```

## Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

## License

MIT
