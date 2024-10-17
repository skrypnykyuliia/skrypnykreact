import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../redux/cartSlice";
import { openModal, closeModal } from "../../redux/modalSlice";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: transparent;
  border-radius: 8px;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 16px 32px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 20px;
`;

const Button = styled.button`
  padding: 16px 32px;
  background-color: #0d50ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

function OrderForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        price: product.discont_price || product.price,
      })),
    };

    try {
      const response = await axios.post("http://localhost:3333/order/send", orderData);
      console.log("Заказ успешно отправлен:", response.data);

      dispatch(clearCart());
      reset();

      dispatch(openModal({
        title: "Поздравляем!",
        content: "Ваш заказ успешно размещен на сайте. Менеджер свяжется с вами в ближайшее время для подтверждения заказа."
      }));

      setTimeout(() => {
        dispatch(closeModal());
      }, 60000);
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input {...register("name", { required: true })} placeholder="Имя" />
        {errors.name && <ErrorMessage>Это поле обязательно</ErrorMessage>}
      </InputContainer>
      
      <InputContainer>
        <Input {...register("phone", { required: true, pattern: /^[0-9]/ })} placeholder="Номер телефона" />
        {errors.phone && <ErrorMessage>Некорректный номер телефона</ErrorMessage>}
      </InputContainer>
      
      <InputContainer>
        <Input {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} placeholder="Email" />
        {errors.email && <ErrorMessage>Некорректный email</ErrorMessage>}
      </InputContainer>
      
      <Button type="submit">Заказать</Button>
    </Form>
  );
}

export default OrderForm;
