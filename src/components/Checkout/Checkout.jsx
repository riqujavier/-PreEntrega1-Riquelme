import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { CartContext } from '../CartContext/CartContext';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con la información de la orden
        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            items: cart.map(item => ({ title: item.title, quantity: item.quantity, price: item.price })),
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        };

        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');

        try {
            const docRef = await addDoc(ordersCollection, orderData);
            console.log('Orden guardada con ID: ', docRef.id);
            clearCart();
        } catch (error) {
            console.error('Error al guardar la orden: ', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="Ingrese su teléfono" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Confirmar compra
                </Button>
            </Form>
        </div>
    );
};

export default Checkout;
