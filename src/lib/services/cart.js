import useAuthStore from "@/src/store/authStore";

const API_URL = "/api/cart";

export const getCart = async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to fetch cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export const addToCart = async (product_id, quantity, variation_id = 0, variation_name = "", variation_attributes = {}) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ product_id, quantity, variation_id, variation_name, variation_attributes })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to add to cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export const updateQuantityAPI = async (product_id, quantity, variation_id = 0, variation_attributes = {}) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ product_id, quantity, variation_id, variation_attributes })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to update cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export const removeFromCartAPI = async (product_id, variation_id = 0) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ product_id, variation_id })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to remove from cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export const clearCartAPI = async () => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/clear`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to clear cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

export const mergeCartAPI = async (guest_cart) => {
    const token = useAuthStore.getState().token;
    const res = await fetch(`${API_URL}/merge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ guest_cart })
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.error || `Failed to merge cart (${res.status})`);
        error.status = res.status;
        throw error;
    }
    return res.json();
}