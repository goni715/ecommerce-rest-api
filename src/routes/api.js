const express =require('express');
const AuthVerifyMiddleware=require("../middlewares/AuthVerifyMiddleware");
const IsAdmin=require("../middlewares/IsAdmin");

const UsersController = require("../controllers/Users/UsersController");
const ProductsController = require("../controllers/Products/ProductsController");
const BlogController = require("../controllers/Blog/BlogController");
const ProductCategoryController = require("../controllers/ProductCategory/ProductCategoryController");
const BlogCategoryController = require("../controllers/BlogCategory/BlogCategoryController");
const BrandController = require("../controllers/Brand/BrandController");
const EnquiryController = require("../controllers/Enquiry/EnquiryController");
const ColorController = require("../controllers/Color/ColorController");
const CouponController = require("../controllers/Coupon/CouponController");
const OrderController = require("../controllers/Order/OrderController");
const UploadController = require("../controllers/Upload/UploadController");
const upload = require('../helper/upload/upload')
const CartController = require("../controllers/Cart/CartController");



const router = express.Router();



//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});



//Users
router.post("/Registration",UsersController.Registration);
//Sign Up With Email Verify
router.get("/SignUpEmailVerify/:email",UsersController.SignUpEmailVerify);
router.post('/SignUpVerifyOTP/:email/:otp',UsersController.SignUpVerifyOTP);

router.post("/Login",UsersController.Login);
router.post("/AdminLogin",UsersController.AdminLogin);
router.get("/RefreshToken",UsersController.RefreshToken);

router.get("/Logout",UsersController.Logout);


router.get("/GetAllUser",AuthVerifyMiddleware, IsAdmin, UsersController.GetAllUser);
router.get("/GetUser",AuthVerifyMiddleware,UsersController.GetUser);
router.get("/DeleteUser/:id",UsersController.DeleteUser);
router.post("/UpdateUser",AuthVerifyMiddleware, UsersController.UpdateUser);
router.post("/SaveAddress",AuthVerifyMiddleware,UsersController.SaveAddress);

router.put("/BlockUser/:id", AuthVerifyMiddleware, IsAdmin, UsersController.BlockUser);
router.put("/UnblockUser/:id", AuthVerifyMiddleware, IsAdmin, UsersController.UnblockUser);

//Change Password
router.get("/ChangePassword/:currentPassword/:newPassword",AuthVerifyMiddleware, UsersController.ChangePassword);
//Forgot Password--OTP
router.get("/ForgotPasswordVerifyEmail/:email",UsersController.ForgotPasswordVerifyEmail);
router.get("/ForgotPasswordVerifyOTP/:email/:otp",UsersController.ForgotPasswordVerifyOTP);
router.post("/CreateNewPassword",UsersController.CreateNewPassword);


//Recover Password With Link
router.get("/RecoverPasswordVerifyEmail/:email",UsersController.RecoverPasswordVerifyEmail);
router.post("/ResetPassword/:token",UsersController.ResetPassword);

router.get("/GetWishlist",AuthVerifyMiddleware,UsersController.GetWishlist);





//Products
router.post("/CreateProduct", AuthVerifyMiddleware, IsAdmin, ProductsController.CreateProduct);
router.get("/GetAProduct/:id",ProductsController.GetAProduct);
router.get("/GetAllProducts/:searchKeyword",ProductsController.GetAllProducts);
router.put("/UpdateProduct/:id",AuthVerifyMiddleware, IsAdmin, ProductsController.UpdateProduct);
router.get("/DeleteProduct/:id", AuthVerifyMiddleware, IsAdmin, ProductsController.DeleteProduct);
router.get("/FilterProducts/:searchValue/:letter/:price/:date/:category/:fromPrice/:toPrice/:empty",ProductsController.FilterProducts);

router.post("/AddToWishList", AuthVerifyMiddleware, ProductsController.AddToWishList);
router.post("/RemoveWishList", AuthVerifyMiddleware, ProductsController.RemoveWishList);
router.post("/Rating", AuthVerifyMiddleware, ProductsController.Rating);
router.post("/UploadProductImage/:id", upload.array("images", 10), AuthVerifyMiddleware, IsAdmin, UploadController.UploadProductImage);
router.put("/DeleteProductImage/:id", AuthVerifyMiddleware, IsAdmin, UploadController.DeleteProductImage);






//Blogs
router.post("/CreateBlog", AuthVerifyMiddleware, IsAdmin, BlogController.CreateBlog);
router.put("/UpdateBlog/:id",AuthVerifyMiddleware, IsAdmin, BlogController.UpdateBlog);
router.get("/GetABlog/:id", BlogController.GetABlog);
router.get("/GetAllBlogs", BlogController.GetAllBlogs);
router.get("/DeleteBlog/:id", AuthVerifyMiddleware, IsAdmin, BlogController.DeleteBlog);
router.put("/LikeBlog", AuthVerifyMiddleware, BlogController.LikeBlog);
router.put("/DislikeBlog", AuthVerifyMiddleware, BlogController.DislikeBlog);
router.post("/UploadBlogImage/:id", upload.array("images", 2), AuthVerifyMiddleware, IsAdmin, UploadController.UploadBlogImage);
router.put("/DeleteBlogImage/:id", AuthVerifyMiddleware, IsAdmin, UploadController.DeleteBlogImage);



//ProductCategory
router.post("/CreateProductCategory", AuthVerifyMiddleware, IsAdmin, ProductCategoryController.CreateProductCategory);
router.put("/UpdateProductCategory/:id",AuthVerifyMiddleware, IsAdmin, ProductCategoryController.UpdateProductCategory);
router.get("/DeleteProductCategory/:id",AuthVerifyMiddleware, IsAdmin, ProductCategoryController.DeleteProductCategory);
router.get("/GetProductCategory/:id", ProductCategoryController.GetProductCategory);
router.get("/GetAllProductCategory", ProductCategoryController.GetAllProductCategory);




//BlogCategory
router.post("/CreateBlogCategory", AuthVerifyMiddleware, IsAdmin, BlogCategoryController.CreateBlogCategory);
router.put("/UpdateBlogCategory/:id", AuthVerifyMiddleware, IsAdmin, BlogCategoryController.UpdateBlogCategory);
router.get("/DeleteBlogCategory/:id",AuthVerifyMiddleware, IsAdmin, BlogCategoryController.DeleteBlogCategory);
router.get("/GetBlogCategory/:id", BlogCategoryController.GetBlogCategory);
router.get("/GetAllBlogCategory", BlogCategoryController.GetAllBlogCategory);



//Brand
router.post("/CreateBrand", AuthVerifyMiddleware, IsAdmin, BrandController.CreateBrand);
router.put("/UpdateBrand/:id", AuthVerifyMiddleware, IsAdmin, BrandController.UpdateBrand);
router.get("/DeleteBrand/:id",AuthVerifyMiddleware, IsAdmin, BrandController.DeleteBrand);
router.get("/GetBrand/:id", BrandController.GetBrand);
router.get("/GetAllBrand", BrandController.GetAllBrand);





//Color
router.post("/CreateColor", AuthVerifyMiddleware, IsAdmin, ColorController.CreateColor);
router.put("/UpdateColor/:id", AuthVerifyMiddleware, IsAdmin, ColorController.UpdateColor);
router.get("/DeleteColor/:id",AuthVerifyMiddleware, IsAdmin, ColorController.DeleteColor);
router.get("/GetColor/:id", ColorController.GetColor);
router.get("/GetAllColor", ColorController.GetAllColor);






//Coupon
router.post("/CreateCoupon", AuthVerifyMiddleware, IsAdmin, CouponController.CreateCoupon);
router.put("/UpdateCoupon/:id", AuthVerifyMiddleware, IsAdmin, CouponController.UpdateCoupon);
router.get("/DeleteCoupon/:id",AuthVerifyMiddleware, IsAdmin, CouponController.DeleteCoupon);
router.get("/GetCoupon/:id", CouponController.GetCoupon);
router.get("/GetAllCoupons", AuthVerifyMiddleware, IsAdmin, CouponController.GetAllCoupons);
//ApplyCoupon
router.post("/ApplyCoupon",AuthVerifyMiddleware, UsersController.ApplyCoupon);




///Cart
router.post("/AddToCart",AuthVerifyMiddleware, CartController.AddToCart);
router.get("/GetUserCart",AuthVerifyMiddleware, CartController.GetUserCart);
router.post("/RemoveProductFromCart",AuthVerifyMiddleware, CartController.RemoveProductFromCart);
router.get("/DeleteUserCart",AuthVerifyMiddleware, CartController.DeleteUserCart);
router.put("/UpdateProductQuantityFromCart",AuthVerifyMiddleware, CartController.UpdateProductQuantityFromCart);
router.get("/GetAllCart",AuthVerifyMiddleware, IsAdmin, CartController.GetAllCart);





//Order
router.get("/GetOrderByUser",AuthVerifyMiddleware, OrderController.GetOrderByUser);
router.get("/GetSingleOrder/:id",AuthVerifyMiddleware, IsAdmin, OrderController.GetSingleOrder);
router.get("/GetAllOrders",AuthVerifyMiddleware, IsAdmin, OrderController.GetAllOrders);
router.put("/UpdateOrderStatus/:id",AuthVerifyMiddleware, IsAdmin, OrderController.UpdateOrderStatus);
router.get("/DeleteOrder/:id",AuthVerifyMiddleware, IsAdmin, OrderController.DeleteOrder);

router.post("/CreateOrderWithPayment",AuthVerifyMiddleware, OrderController.CreateOrderWithPayment);
router.post("/payment/success/:tranId", OrderController.PaymentSuccess);
router.post("/payment/fail/:tranId", OrderController.PaymentFail);



router.get("/getMonthWiseOrderIncome", OrderController.getMonthWiseOrderIncome);
router.get("/getMonthWiseOrderCount", OrderController.getMonthWiseOrderCount);

router.get("/getYearlyTotalOrders", OrderController.getYearlyTotalOrders);




//Image Upload
router.post("/uploadImage", upload.single("image"), UploadController.uploadImage);
router.post("/uploadMultipleImage", upload.array("images", 10), UploadController.uploadMultipleImage);

router.post("/DeleteImage", UploadController.DeleteImage);



//Enquiry
router.post("/CreateEnquiry", AuthVerifyMiddleware, EnquiryController.CreateEnquiry);
router.put("/UpdateEnquiry/:id", AuthVerifyMiddleware, IsAdmin, EnquiryController.UpdateEnquiry);
router.get("/DeleteEnquiry/:id",AuthVerifyMiddleware, IsAdmin, EnquiryController.DeleteEnquiry);
router.get("/GetEnquiry/:id", EnquiryController.GetEnquiry);
router.get("/GetAllEnquiry", EnquiryController.GetAllEnquiry);








module.exports=router;