import {
  Navigation,
  Footer,
  ProtectedRoute
} from "@/components"
import { 
  Home, 
  Meals, 
  Product, 
  Cart, 
  Checkout, 
  MemberPage, 
  PhoneApp,
} from '@/pages';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store"
import "@/App.css"

function App() {

  return (
      <Provider store={store}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/phone-app" element={<PhoneApp />}/>
            <Route path="/login" element={<MemberPage />}/>
            <Route path="/products" element={<Meals />}/>
            <Route path="/product/:id" element={<Product />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/thank-you" element={<ProtectedRoute />}/>
          </Routes>
          <Footer />
        </Router>
      </Provider>
  )
}

export default App
