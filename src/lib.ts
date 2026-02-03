import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { EXTRACTION_PROMPT } from "./prompt.js";

export interface ExtractOptions {
  apiKey?: string;
  model?: string;
}

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

function getImageMimeType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext];
  if (!mimeType) {
    throw new Error(`Unsupported image format: ${ext}`);
  }
  return mimeType;
}

function loadImageAsBase64(filePath: string): { data: string; mimeType: string } {
  const buffer = readFileSync(filePath);
  const mimeType = getImageMimeType(filePath);
  return {
    data: buffer.toString("base64"),
    mimeType,
  };
}

export async function extractFoodTable(
  imagePaths: string[],
  options: ExtractOptions = {}
): Promise<string> {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      "Gemini API key required. Set GEMINI_API_KEY environment variable or pass apiKey option."
    );
  }

  const modelName = options.model || "gemini-3-flash-preview";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  const imageParts = imagePaths.map((path) => {
    const { data, mimeType } = loadImageAsBase64(path);
    return {
      inlineData: { data, mimeType },
    };
  });

  const result = await model.generateContent([EXTRACTION_PROMPT, ...imageParts]);
  const response = result.response;
  const text = response.text();

  return text.trim();
}
