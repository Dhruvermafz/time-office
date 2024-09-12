import ContactPage from "../pages/Contact";
import ComingSoon from "../pages/ComingSoon";
import Error404Page from "../pages/Error404Page";
import Error505Page from "../pages/Error505Page";
import AboutUs from "../component/AboutUs/AboutUs";
import About from "../component/AboutUs/About";
export const publicRoutes = [
  { path: "/500", element: Error505Page },
  { path: "/404", element: Error404Page },
  { path: "comingsoon", element: ComingSoon },
  { path: "contact", element: ContactPage },
  { path: "aboutus", element: About },
];

// export const adminRoutes = [
//   { path: "/admin", element: AdminWrapper },
//   { path: "/admin/tours", element: TourList },
//   { path: "/admin/comments-reviews", element: ReviewsCard },
//   { path: "/admin/tours/create", element: AddTourPackage },
//   { path: "/admin/tours/update", element: UpdateTour },
//   { path: "/admin/bookings", element: Bookings },
//   { path: "/admin/queries", element: Queries },
//   { path: "/admin/blogs", element: BlogPage },
//   { path: "/admin/blog/create", element: BlogCreate },
//   { path: "/admin/reviews", element: CommentsReviews },
//   { path: "/admin/users", element: UsersTable },
//   { path: "/admin/extras", element: CategoriesTags },
// ];
