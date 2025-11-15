import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createUser, updateUser, getUser } from '@services/users';

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await getUser(userId);

    if (!user) {
      // User doesn't exist in database yet
      return NextResponse.json({
        gender: "",
        height: 0,
        weight: 0,
        calorieGoal: 0,
      }, { status: 200 });
    }

    // Map database user to frontend User type
    return NextResponse.json({
      gender: user.gender || "",
      height: user.height || 0,
      weight: user.weight || 0,
      calorieGoal: user.calorieGoal || 0,
      // Include other fields if needed
      bmi: user.bmi ? parseFloat(user.bmi.toString()) : undefined,
      totalCalories: user.totalCalories || 0,
      totalProtein: user.totalProtein || 0,
      totalCarbs: user.totalCarbs || 0,
      totalFats: user.totalFats || 0,
      totalCarbonFootPrint: user.totalCarbonFootPrint || 0,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    
    // Provide more specific error messages
    if (error?.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Database connection failed. Please ensure the database server is running and DATABASE_URL is configured in your .env.local file.' },
        { status: 503 }
      );
    }
    
    if (error?.message) {
      return NextResponse.json(
        { error: `Failed to fetch user: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch user. Please check your database connection and try again.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { gender, height, weight, calorieGoal } = body;

    // Validate required fields
    if (!gender || !height || !weight || !calorieGoal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user data (height and weight are already in inches and pounds)
    const userData = {
      name: userId, // Use Clerk userId as username
      gender: gender,
      height: Math.round(parseFloat(height)),
      weight: Math.round(parseFloat(weight)),
      calGoal: parseInt(calorieGoal), // Service expects calGoal but maps to calorieGoal in DB
    };

    // Create user in database
    const newUser = await createUser(userData);
    
    // createUser returns an array, get the first element
    const createdUser = Array.isArray(newUser) ? newUser[0] : newUser;

    // Map database user to frontend User type
    return NextResponse.json({
      gender: createdUser.gender || "",
      height: createdUser.height || 0,
      weight: createdUser.weight || 0,
      calorieGoal: createdUser.calorieGoal || 0,
      bmi: createdUser.bmi ? parseFloat(createdUser.bmi.toString()) : undefined,
      totalCalories: createdUser.totalCalories || 0,
      totalProtein: createdUser.totalProtein || 0,
      totalCarbs: createdUser.totalCarbs || 0,
      totalFats: createdUser.totalFats || 0,
      totalCarbonFootPrint: createdUser.totalCarbonFootPrint || 0,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    // Provide more specific error messages
    if (error?.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Database connection failed. Please ensure the database server is running and DATABASE_URL is configured in your .env.local file.' },
        { status: 503 }
      );
    }
    
    if (error?.message) {
      return NextResponse.json(
        { error: `Failed to create user: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create user. Please check your database connection and try again.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { gender, height, weight, calorieGoal } = body;

    // Check if user exists, if not create them
    const existingUser = await getUser(userId);

    if (!existingUser) {
      // User doesn't exist, create them first
      if (!gender || !height || !weight || !calorieGoal) {
        return NextResponse.json(
          { error: 'Missing required fields for new user. Please provide gender, height, weight, and calorie goal.' },
          { status: 400 }
        );
      }

      const userData = {
        name: userId,
        gender: gender,
        height: Math.round(parseFloat(height)),
        weight: Math.round(parseFloat(weight)),
        calGoal: parseInt(calorieGoal), // Service expects calGoal but maps to calorieGoal in DB
      };

      const newUser = await createUser(userData);
      const createdUser = Array.isArray(newUser) ? newUser[0] : newUser;
      
      // Map database user to frontend User type
      return NextResponse.json({
        gender: createdUser.gender || "",
        height: createdUser.height || 0,
        weight: createdUser.weight || 0,
        calorieGoal: createdUser.calorieGoal || 0,
        bmi: createdUser.bmi ? parseFloat(createdUser.bmi.toString()) : undefined,
        totalCalories: createdUser.totalCalories || 0,
        totalProtein: createdUser.totalProtein || 0,
        totalCarbs: createdUser.totalCarbs || 0,
        totalFats: createdUser.totalFats || 0,
        totalCarbonFootPrint: createdUser.totalCarbonFootPrint || 0,
      }, { status: 201 });
    }

    // Update user data (height and weight are already in inches and pounds)
    const updateData: any = {};
    if (gender !== undefined) updateData.gender = gender;
    if (height !== undefined) updateData.height = Math.round(parseFloat(height));
    if (weight !== undefined) updateData.weight = Math.round(parseFloat(weight));
    if (calorieGoal !== undefined) updateData.calorieGoal = parseInt(calorieGoal);

    // Update user in database
    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found or update failed' },
        { status: 404 }
      );
    }

    // Map database user to frontend User type
    return NextResponse.json({
      gender: updatedUser.gender || "",
      height: updatedUser.height || 0,
      weight: updatedUser.weight || 0,
      calorieGoal: updatedUser.calorieGoal || 0,
      bmi: updatedUser.bmi ? parseFloat(updatedUser.bmi.toString()) : undefined,
      totalCalories: updatedUser.totalCalories || 0,
      totalProtein: updatedUser.totalProtein || 0,
      totalCarbs: updatedUser.totalCarbs || 0,
      totalFats: updatedUser.totalFats || 0,
      totalCarbonFootPrint: updatedUser.totalCarbonFootPrint || 0,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating user:', error);
    
    // Provide more specific error messages
    if (error?.cause?.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Database connection failed. Please ensure the database server is running and DATABASE_URL is configured in your .env.local file.' },
        { status: 503 }
      );
    }
    
    if (error?.message) {
      return NextResponse.json(
        { error: `Failed to update user: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update user. Please check your database connection and try again.' },
      { status: 500 }
    );
  }
}
