const express = require("express");

const {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  attachSessionCart,
} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCart);
router.post("/items", addCartItem);
router.patch("/items", updateCartItem);
router.delete("/items", removeCartItem);
router.post("/attach-session", protect, attachSessionCart);
router.get("/me", protect, getCart);
router.post("/me/items", protect, addCartItem);
router.patch("/me/items", protect, updateCartItem);
router.delete("/me/items", protect, removeCartItem);

module.exports = router;
