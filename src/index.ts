#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { extractFoodTable } from "./lib.js";

interface ParsedArgs {
  images: string[];
  output?: string;
  apiKey?: string;
  help: boolean;
}

function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = { images: [], help: false };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "-h" || arg === "--help") {
      result.help = true;
    } else if (arg === "-o" || arg === "--output") {
      result.output = args[++i];
    } else if (arg === "-k" || arg === "--api-key") {
      result.apiKey = args[++i];
    } else if (!arg.startsWith("-")) {
      result.images.push(arg);
    }
  }
  
  return result;
}

function printHelp(): void {
  console.log(`
food-ocr - Extract food tables from images using Gemini Flash

USAGE:
  food-ocr [OPTIONS] <image1> [image2] [...]

OPTIONS:
  -o, --output <file>   Write output to file instead of stdout
  -k, --api-key <key>   Gemini API key (default: GEMINI_API_KEY env var)
  -h, --help            Show this help message

EXAMPLES:
  food-ocr screenshot.jpg
  food-ocr image1.jpg image2.jpg -o combined.md
  GEMINI_API_KEY=xxx food-ocr screenshot.png

SUPPORTED FORMATS:
  .jpg, .jpeg, .png, .gif, .webp
`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  
  if (args.help || args.images.length === 0) {
    printHelp();
    process.exit(args.help ? 0 : 1);
  }

  try {
    const markdown = await extractFoodTable(args.images, { apiKey: args.apiKey });
    
    if (args.output) {
      writeFileSync(args.output, markdown + "\n");
      console.error(`Output written to ${args.output}`);
    } else {
      console.log(markdown);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
