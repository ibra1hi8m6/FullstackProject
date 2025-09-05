import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IngredientComponent } from './features/add/Ingredient/ingredient/ingredient.component';
import { CategoryIngredientComponent } from './features/add/Ingredient/category-ingredient/category-ingredient.component';
import { MealComponent } from './features/add/Meal/meal/meal.component';
import { CategoryMealComponent } from './features/add/Meal/category-meal/category-meal.component';
import { SizeComponent } from './features/add/Size/size/size.component';
import { CategorySizeComponent } from './features/add/Size/category-size/category-size.component';
import { AddCategoryIngredientComponent } from './features/add/Ingredient/category-ingredient/add-category-ingredient/add-category-ingredient.component';
import { UpdateCategoryIngredientComponent } from './features/add/Ingredient/category-ingredient/update-category-ingredient/update-category-ingredient.component';
import { DeleteCategoryIngredientComponent } from './features/add/Ingredient/category-ingredient/delete-category-ingredient/delete-category-ingredient.component';
import { GetCategoryIngredientComponent } from './features/add/Ingredient/category-ingredient/get-category-ingredient/get-category-ingredient.component';
import { AddIngredientComponent } from './features/add/Ingredient/ingredient/add-ingredient/add-ingredient.component';
import { UpdateIngredientComponent } from './features/add/Ingredient/ingredient/update-ingredient/update-ingredient.component';
import { DeleteIngredientComponent } from './features/add/Ingredient/ingredient/delete-ingredient/delete-ingredient.component';
import { GetIngredientComponent } from './features/add/Ingredient/ingredient/get-ingredient/get-ingredient.component';
import { AddCategorySizeComponent } from './features/add/Size/category-size/add-category-size/add-category-size.component';
import { UpdateCategorySizeComponent } from './features/add/Size/category-size/update-category-size/update-category-size.component';
import { DeleteCategorySizeComponent } from './features/add/Size/category-size/delete-category-size/delete-category-size.component';
import { GetCategorySizeComponent } from './features/add/Size/category-size/get-category-size/get-category-size.component';
import { AddSizeComponent } from './features/add/Size/size/add-size/add-size.component';
import { UpdateSizeComponent } from './features/add/Size/size/update-size/update-size.component';
import { DeleteSizeComponent } from './features/add/Size/size/delete-size/delete-size.component';
import { GetSizeComponent } from './features/add/Size/size/get-size/get-size.component';
import { AddCategoryMealComponent } from './features/add/Meal/category-meal/add-category-meal/add-category-meal.component';
import { UpdateCategoryMealComponent } from './features/add/Meal/category-meal/update-category-meal/update-category-meal.component';
import { DeleteCategoryMealComponent } from './features/add/Meal/category-meal/delete-category-meal/delete-category-meal.component';
import { GetCategoryMealComponent } from './features/add/Meal/category-meal/get-category-meal/get-category-meal.component';
import { AddMealComponent } from './features/add/Meal/meal/add-meal/add-meal.component';
import { UpdateMealComponent } from './features/add/Meal/meal/update-meal/update-meal.component';
import { DeleteMealComponent } from './features/add/Meal/meal/delete-meal/delete-meal.component';
import { GetMealComponent } from './features/add/Meal/meal/get-meal/get-meal.component';
import { MenuComponent } from './features/menu/menu/menu.component';
import { SingleMealComponent } from './features/menu/single-meal/single-meal.component';
import { CartComponent } from './features/order/cart/cart.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { ForbiddenComponent } from './shared/forbidden/forbidden.component';
import { AdminUserManagementComponent } from './user/admin-user-management/admin-user-management.component';
import { authGuard } from './shared/Guard/auth.guard';
import { claimReq } from './shared/utils/claimReq-utils';
import { AddressComponent } from './user/addresses/address.component';
import { ManageAddressesComponent } from './user/addresses/manage-addresses/manage-addresses.component';
import { AddAddressComponent } from './user/addresses/add-address/add-address.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserOrderComponent } from './features/order/user-order/user-order.component';
import { ManagerOrderComponent } from './features/order/user-order/manager-order/manager-order.component';
import { OrderCheckoutComponent } from './features/order/user-order/order-checkout/order-checkout.component';
import { OrderHistoryComponent } from './features/order/user-order/order-history/order-history.component';
import { UserLookupComponent } from './user/user-lookup/user-lookup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent },
      {
        path: 'adminSignup',
        component: AdminUserManagementComponent,
        canActivate: [authGuard],
        data: { claimReq: claimReq.adminOnly },
      },

    ],
  },
  {
        path: 'address',
        component: AddressComponent,
        children: [
          { path: 'manage', component: ManageAddressesComponent },
          { path: 'add', component: AddAddressComponent },
           // default
        ]
  },
  {
        path: 'profile',
        component: ProfileComponent // you can edit later
  }, {
        path: 'userlookup',
        component: UserLookupComponent // you can edit later
  },
  {
    path: 'ingredients',
    component: IngredientComponent,
    children: [
      { path: 'add', component: AddIngredientComponent },
      { path: 'update', component: UpdateIngredientComponent },
      { path: 'delete', component: DeleteIngredientComponent },
      { path: 'get', component: GetIngredientComponent },
      { path: '', redirectTo: 'get', pathMatch: 'full' }, // Default route
    ],
  },

  {
    path: 'ingredients/category',
    component: CategoryIngredientComponent,
    children: [
      { path: 'add', component: AddCategoryIngredientComponent },
      { path: 'update', component: UpdateCategoryIngredientComponent },
      { path: 'delete', component: DeleteCategoryIngredientComponent },
      { path: 'get', component: GetCategoryIngredientComponent },
      { path: '', redirectTo: 'get', pathMatch: 'full' }, // Default route
    ],
  },
  {
    path: 'meals',
    component: MealComponent,
    children: [
      { path: 'add', component: AddMealComponent },
      { path: 'update', component: UpdateMealComponent },
      { path: 'delete', component: DeleteMealComponent },
      { path: 'get', component: GetMealComponent },
    ],
  },
  {
    path: 'meals/category',
    component: CategoryMealComponent,
    children: [
      { path: 'add', component: AddCategoryMealComponent },
      { path: 'update', component: UpdateCategoryMealComponent },
      { path: 'delete', component: DeleteCategoryMealComponent },
      { path: 'get', component: GetCategoryMealComponent },
    ],
  },
  {
    path: 'sizes',
    component: SizeComponent,
    children: [
      { path: 'add', component: AddSizeComponent },
      { path: 'update', component: UpdateSizeComponent },
      { path: 'delete', component: DeleteSizeComponent },
      { path: 'get', component: GetSizeComponent },
    ],
  },
  {
    path: 'sizes/category',
    component: CategorySizeComponent,
    children: [
      { path: 'add', component: AddCategorySizeComponent },
      { path: 'update', component: UpdateCategorySizeComponent },
      { path: 'delete', component: DeleteCategorySizeComponent },
      { path: 'get', component: GetCategorySizeComponent },
    ],
  },
  { path: 'meal/:id', component: SingleMealComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart/:id', component: CartComponent },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
   {
    path: 'user-order',
    component: UserOrderComponent,
    children: [
      { path: 'manager-order', component: ManagerOrderComponent },
      { path: 'order-checkout', component: OrderCheckoutComponent },
      { path: 'order-history', component: OrderHistoryComponent },

    ],
  },
];

