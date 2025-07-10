import React, { useEffect, useState } from "react";
import PizzaCard from "../../components/ui/PizzaCard";
import { getPizzaCatalog } from "../../shared/api/pizzaApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorCard from "../../components/ui/ErrorCard";
import PizzaPopup from "../PizzaPopup/PizzaPopup";
import { baseUrl } from "../../shared/constants";

const HomePage: React.FC = () => {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPizza, setSelectedPizza] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const loadingMessage = "Выгружаем самую вкусную пиццу...";

  useEffect(() => {
    getPizzaCatalog()
      .then((response) => {
        if (response.data.success) {
          setPizzas(response.data.catalog);
          setError(null);
        } else {
          setError("Упс, удалось загрузить пиццы, попробуйте ещё раз...");
        }
      })
      .catch(() => {
        setError("Упс, что-то пошло не так, попробуйте ещё раз...");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message={loadingMessage} />;
  if (error) return <ErrorCard message={error} />;

  return (
    <div className="container mx-auto py-8 flex justify-center px-4">
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            name={pizza.name}
            description={pizza.description}
            price={`от ${pizza.sizes[0]?.price ?? "?"} ₽`}
            imageUrl={baseUrl + pizza.img}
            onClick={() => {
              setSelectedPizza(pizza);
              setIsPopupOpen(true);
            }}
          />
        ))}
      </div>
      {selectedPizza && isPopupOpen && (
        <PizzaPopup
          pizza={selectedPizza}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
