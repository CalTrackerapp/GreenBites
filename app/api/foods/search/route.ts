import { NextRequest, NextResponse } from "next/server";

const NUTRITION_API_KEY = process.env.NUTRITION_API_KEY || "3E9YfbcWaIFwspwgXs5oVg==vyJeVpWtQfKfjOkZ";
const NUTRITION_API_URL = "https://api.calorieninjas.com/v1/nutrition";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Call the CalorieNinjas API
    const response = await fetch(
      `${NUTRITION_API_URL}?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "X-Api-Key": NUTRITION_API_KEY,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `CalorieNinjas API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { error: "Failed to fetch nutrition data", items: [] },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching for foods:", error);
    return NextResponse.json(
      {
        error: "Failed to search for food items",
        items: [],
      },
      { status: 500 }
    );
  }
}

