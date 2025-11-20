// Import the database instance and schema from the main file
import { db } from "../index.ts"; 
import * as schema from "../db/schema.ts";
import { eq } from 'drizzle-orm'; 
import { users } from "../db/schema.ts";

function calculateBMI(weightInPounds: number, heightInInches: number): number {
  if (heightInInches === 0) throw new Error("Height cannot be zero.");
  return (weightInPounds * 703) / (heightInInches ** 2);
}


type UserData = {

    name: string;
    gender: string;
    height: number;
    weight: number;
    calGoal: number;
};


export async function getAllUsers() {
  return await db.select().from(schema.users);
}

export async function createUser(data: UserData) {

    const bmi = calculateBMI(data.weight, data.height);
    const result = await db.insert(schema.users).values({
        username: data.name,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        bmi: bmi.toString(),
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalSodium: 0,
        totalCarbonFootPrint: 0,
        calorieGoal: data.calGoal,
    }).returning();

    return result;
}

export async function deleteUser(username: string) {
  return await db.delete(schema.users).where(eq(schema.users.username, username));
}

export async function getUser(username: string) {
  // Use .limmit(1) and then grab the first element
  const result = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
  return result[0]; // Return the single user object or undefined
}

//method has been updated with the one below
// export async function updateUser(username: string, data: Partial<UserData & { calorieGoal?: number }>) {
//   const updateData: any = {};
  
//   if (data.gender !== undefined) updateData.gender = data.gender;
//   if (data.height !== undefined) updateData.height = data.height;
//   if (data.weight !== undefined) updateData.weight = data.weight;
//   if (data.calGoal !== undefined) updateData.calorieGoal = data.calGoal;
//   if ((data as any).calorieGoal !== undefined) updateData.calorieGoal = (data as any).calorieGoal;
  
//   // Recalculate BMI if height or weight changed
//   if (data.height !== undefined && data.weight !== undefined) {
//     updateData.bmi = calculateBMI(data.weight, data.height).toString();
//   } else if (data.height !== undefined || data.weight !== undefined) {
//     // Get current user to calculate BMI with existing values
//     const currentUser = await getUser(username);
//     if (currentUser) {
//       const height = data.height !== undefined ? data.height : currentUser.height;
//       const weight = data.weight !== undefined ? data.weight : currentUser.weight;
//       if (height && weight) {
//         updateData.bmi = calculateBMI(weight as number, height as number).toString();
//       }
//     }
//   }
  
//   const result = await db.update(schema.users)
//     .set(updateData)
//     .where(eq(schema.users.username, username))
//     .returning();
  
//   return result[0];
// }

//small modification to above
export async function updateUser(
  username: string,
  data: Partial<{
    gender: string;
    height: number;
    weight: number;
    calorieGoal: number;
  }>
) {
  const updateData: any = {};

  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.weight !== undefined) updateData.weight = data.weight;
  if (data.calorieGoal !== undefined) updateData.calorieGoal = data.calorieGoal;

  // Recalculate BMI if height or weight changed
  if (data.height !== undefined && data.weight !== undefined) {
    updateData.bmi = calculateBMI(data.weight, data.height).toString();
  } else if (data.height !== undefined || data.weight !== undefined) {
    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (currentUser.length > 0) {
      const height = data.height ?? currentUser[0].height;
      const weight = data.weight ?? currentUser[0].weight;
      if (height && weight) {
        updateData.bmi = calculateBMI(weight, height).toString();
      }
    }
  }

  await db.update(users).set(updateData).where(eq(users.username, username));

  return { username, ...updateData };
}