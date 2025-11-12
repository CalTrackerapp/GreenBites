# User Stories

## As a user, I want to...

### MVP (Weeks 1-3)

- [x] **Sign up and create an account** so that I can track my nutrition and carbon footprint
  - **Acceptance Criteria**:
    - Given I am on the homepage, When I click "Sign Up", Then I can create an account with email/password, And I can also use social login options
    - Given I have created an account, When I sign in, Then I am redirected to my dashboard

- [x] **Set up my profile** so that the app can provide personalized recommendations
  - **Acceptance Criteria**:
    - Given I am a new user, When I first sign in, Then I am prompted to set up my profile, And I can enter my gender, height, weight, and calorie goals
    - Given I have set up my profile, When I save it, Then my information is stored and I can access my dashboard

- [x] **Search for foods** so that I can find nutrition information for what I eat
  - **Acceptance Criteria**:
    - Given I am on the Add Meal page, When I type a food name in the search bar, Then I see a list of matching foods with nutrition data, And I can select a food to add to my meal

- [x] **Log my meals** so that I can track my daily nutrition intake
  - **Acceptance Criteria**:
    - Given I have selected foods, When I adjust serving sizes and click "Log Meal", Then the meal is saved to my food log, And my daily totals are updated

- [x] **View my dashboard** so that I can see my nutrition progress
  - **Acceptance Criteria**:
    - Given I am signed in, When I navigate to the dashboard, Then I see my daily calorie progress, macro breakdown, and carbon footprint, And I can see weekly trends

### Enhanced Features (Weeks 4-6)

- [x] **See my daily calorie progress** so that I know if I'm meeting my goals
  - **Acceptance Criteria**:
    - Given I have logged meals, When I view my dashboard, Then I see a visual indicator of calories consumed vs. goal, And I can see remaining calories for the day

- [x] **Track my macros (protein, carbs, fats)** so that I can maintain a balanced diet
  - **Acceptance Criteria**:
    - Given I have logged meals, When I view my dashboard, Then I see a breakdown of protein, carbs, and fats, And I can see percentages and grams for each macro

- [x] **View my carbon footprint** so that I understand the environmental impact of my food choices
  - **Acceptance Criteria**:
    - Given I have logged meals, When I view my dashboard, Then I see my daily and total carbon footprint, And I can see how my choices impact the environment

- [x] **See weekly trends** so that I can track my progress over time
  - **Acceptance Criteria**:
    - Given I have logged meals for multiple days, When I view my dashboard, Then I see a chart showing my calorie intake over the past week, And I can identify patterns in my eating habits

- [x] **Update my profile information** so that I can adjust my goals as my needs change
  - **Acceptance Criteria**:
    - Given I am on the account page, When I update my height, weight, or calorie goal, Then my changes are saved, And my dashboard reflects the updated goals

### Advanced Features (Weeks 7-10)

- [x] **Search foods using natural language** so that I can quickly find what I'm looking for
  - **Acceptance Criteria**:
    - Given I am on the Add Meal page, When I search for "chicken breast" or "2 eggs", Then I see relevant results with accurate nutrition data, And I can select the correct item

- [x] **Adjust serving sizes** so that I can accurately log the amount I actually ate
  - **Acceptance Criteria**:
    - Given I have selected a food, When I adjust the serving size slider, Then the nutrition values update in real-time, And I can see the adjusted calories and macros

- [x] **View my food log history** so that I can see what I've eaten
  - **Acceptance Criteria**:
    - Given I have logged meals, When I view my food log, Then I see a list of all my logged meals with dates, And I can see the nutrition breakdown for each meal

- [x] **Track sodium intake** so that I can monitor my health
  - **Acceptance Criteria**:
    - Given I have logged meals, When I view my dashboard, Then I see my daily sodium intake, And I can see sodium trends over time

- [x] **Have my data persist** so that I don't lose my progress
  - **Acceptance Criteria**:
    - Given I have logged meals and set up my profile, When I sign out and sign back in, Then all my data is still there, And my dashboard shows my current progress

## Acceptance Criteria

### Food Search & Logging
**Given** I am on the Add Meal page  
**When** I search for a food item and select it  
**Then** I can adjust the serving size  
**And** I can add it to my meal  
**And** When I log the meal, it is saved to my food log  
**And** My daily totals are updated immediately

### Dashboard Visualization
**Given** I have logged meals for the day  
**When** I view my dashboard  
**Then** I see a radial chart showing calorie progress toward my goal  
**And** I see pie charts for macro breakdown  
**And** I see line charts for weekly trends  
**And** I see my carbon footprint metrics

### Profile Management
**Given** I am a signed-in user  
**When** I navigate to the account page  
**Then** I can view my current profile information  
**And** I can update my gender, height, weight, and calorie goals  
**And** When I save changes, they persist in the database  
**And** My dashboard reflects the updated goals

### Protected Routes
**Given** I am not signed in  
**When** I try to access the dashboard, add-meal, or profile pages  
**Then** I am redirected to the sign-in page  
**And** After signing in, I am redirected back to the page I tried to access

### Data Persistence
**Given** I have logged meals and updated my profile  
**When** I sign out and sign back in later  
**Then** All my data is still available  
**And** My dashboard shows my current progress  
**And** My food log history is preserved
