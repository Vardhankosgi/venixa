const { supabase } = require('../config/supabase');

// GET /shop/products
const getProducts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    if (category) query = query.eq('category', category);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ products: data, total: count });
  } catch (err) {
    next(err);
  }
};

// GET /shop/cart
const getCart = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', req.user.id);

    if (error) throw error;
    const total = data.reduce((s, i) => s + i.products.price * i.quantity, 0);
    res.json({ items: data, total });
  } catch (err) {
    next(err);
  }
};

// POST /shop/cart
const addToCart = async (req, res, next) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', req.user.id)
      .eq('product_id', product_id)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return res.json({ item: data });
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: req.user.id, product_id, quantity })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ item: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /shop/cart/:id
const removeFromCart = async (req, res, next) => {
  try {
    await supabase.from('cart_items').delete().eq('id', req.params.id).eq('user_id', req.user.id);
    res.json({ message: 'Item removed' });
  } catch (err) {
    next(err);
  }
};

// POST /shop/orders
const placeOrder = async (req, res, next) => {
  try {
    const { shipping_address } = req.body;

    const { data: cartItems } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', req.user.id);

    if (!cartItems?.length) return res.status(400).json({ error: 'Cart is empty' });

    const total_amount = cartItems.reduce((s, i) => s + i.products.price * i.quantity, 0);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({ user_id: req.user.id, total_amount, shipping_address, status: 'pending' })
      .select()
      .single();

    if (error) throw error;

    const orderItems = cartItems.map((i) => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      unit_price: i.products.price,
    }));

    await supabase.from('order_items').insert(orderItems);
    await supabase.from('cart_items').delete().eq('user_id', req.user.id);

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

// GET /shop/orders
const getOrders = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, image_url))')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ orders: data });
  } catch (err) {
    next(err);
  }
};

// POST /shop/wishlist
const toggleWishlist = async (req, res, next) => {
  try {
    const { product_id } = req.body;

    const { data: existing } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('product_id', product_id)
      .single();

    if (existing) {
      await supabase.from('wishlist').delete().eq('id', existing.id);
      return res.json({ wishlisted: false });
    }

    await supabase.from('wishlist').insert({ user_id: req.user.id, product_id });
    res.json({ wishlisted: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProducts, getCart, addToCart, removeFromCart, placeOrder, getOrders, toggleWishlist };
