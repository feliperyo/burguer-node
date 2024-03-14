const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");
app.listen(3001);
app.use(express.json());
app.use(cors());

const newOrder = [];

app.post("/order", (request, response) => {
  const { order, clientName, price, status } = request.body;

  const addOrder = { id: uuid.v4(), order, clientName, price, status };

  newOrder.push(addOrder);
  return response.status(201).json(addOrder);
});

app.get("/order", (request, response) => {
  return response.json(newOrder);
});

const needId = (request, response, next) => {
  const { id } = request.params;

  const index = newOrder.findIndex((item) => item.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "id not found" });
  }

  request.orderIndex = index;
  request.orderId = id;

  next();
};

app.put("/order/:id", needId, (request, response) => {
  const { order, clientName, price, status } = request.body;
  const index = request.orderIndex;
  const id = request.orderId;

  const updatedOrder = { id, order, clientName, price, status };

  newOrder[index] = updatedOrder;

  return response.json(updatedOrder);
});

app.delete("/order/:id", needId, (request, response) => {
  const { order, clientName, price, status } = request.body;
  const index = request.orderIndex;
  const id = request.orderId;

  newOrder.splice(index, 1);

  return response.status(204).json();
});

app.patch("/order/:id", needId, (request, response) => {
  const { order, clientName, price, status } = request.body;
  const index = request.orderIndex;
  const id = request.orderId;

  const updatedOrder = { id, order, clientName, price, status: "Pronto" };

  newOrder[index] = updatedOrder;

  return response.status(200).json(updatedOrder);
});
