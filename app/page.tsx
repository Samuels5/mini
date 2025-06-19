"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Facebook, Twitter, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [editMeal, setEditMeal] = useState<{
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    status: string;
    statusColor: string;
    brandColor: string;
    brandInitial: string;
  } | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteMeal, setDeleteMeal] = useState<{
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    rating: number;
    status: string;
    statusColor: string;
    brandColor: string;
    brandInitial: string;
  } | null>(null);
  const [editForm, setEditForm] = useState({
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "",
  });
  const [meals, setMeals] = useState([]);

  const featuredMeals = [
    {
      id: 1,
      name: "Bowl Lasagna",
      description: "Delicious lasagna in a bowl",
      price: "$2.99",
      image: "1.svg",
      rating: 4.6,
      status: "Closed",
      statusColor: "bg-orange-500",
      brandColor: "bg-blue-500",
      brandInitial: "D",
    },
    {
      id: 2,
      name: "Mixed Avocado Str...",
      description: "Fresh avocado mix",
      price: "$5.99",
      image: "2.svg",
      rating: 4.0,
      status: "Closed",
      statusColor: "bg-orange-500",
      brandColor: "bg-yellow-500",
      brandInitial: "M",
    },
    {
      id: 3,
      name: "Pancake",
      description: "Fluffy pancakes with syrup",
      price: "$3.99",
      image: "3.svg",
      rating: 5,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-blue-400",
      brandInitial: "P",
    },
    {
      id: 4,
      name: "Cupcake",
      description: "Sweet frosted cupcakes",
      price: "$1.99",
      image: "4.svg",
      rating: 5,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-green-400",
      brandInitial: "C",
    },
    {
      id: 5,
      name: "Creamy Steak",
      description: "Lorem ipsum dolor sit amet",
      price: "$25.99",
      image: "5.svg",
      rating: 4.7,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-orange-500",
      brandInitial: "S",
    },
    {
      id: 6,
      name: "Steak with Potatoes",
      description: "Lorem ipsum dolor sit amet",
      price: "$22.99",
      image: "6.svg",
      rating: 4.4,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-purple-500",
      brandInitial: "S",
    },
    {
      id: 7,
      name: "Indian Spicy Soup",
      description: "Lorem ipsum dolor sit amet",
      price: "$18.99",
      image: "7.svg",
      rating: 4.5,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-red-500",
      brandInitial: "I",
    },
    {
      id: 8,
      name: "Steak Omelet",
      description: "Lorem ipsum dolor sit amet",
      price: "$16.99",
      image: "8.svg",
      rating: 4.6,
      status: "Open",
      statusColor: "bg-green-500",
      brandColor: "bg-indigo-500",
      brandInitial: "O",
    },
  ];

  // When opening the edit modal, set the form values
  useEffect(() => {
    if (editMeal) {
      setEditForm({
        food_name: editMeal.name || "",
        food_rating: editMeal.rating?.toString() || "",
        food_image: editMeal.image || "",
        restaurant_name: editMeal.brandInitial || "",
        restaurant_logo: editMeal.brandColor || "",
        restaurant_status: editMeal.status || "",
      });
    }
  }, [editMeal]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch(
          "https://6852821e0594059b23cdd834.mockapi.io/Food"
        );
        const data = await res.json();
        setMeals(data);
        console.log("Fetched meals:", data);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    }
    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">🛒</span>
            </div>
            <span className="text-gray-800 font-bold text-xl">FoodWagen</span>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-400 text-white hover:bg-orange-500 font-medium px-6 rounded-full"
          >
            Add Meal
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-orange-400 px-4 py-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <h1 className="text-white text-5xl font-bold mb-4">
              Are you starving?
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Within a few clicks, find meals that are accessible near you
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex space-x-4 mb-4">
                <Button
                  variant="ghost"
                  className="text-orange-400 bg-orange-50"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Delivery
                </Button>
                <Button variant="ghost" className="text-gray-600">
                  Pickup
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="What do you like to eat today?"
                  className="flex-1"
                />
                <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6">
                  Find Food
                </Button>
              </div>
            </div>
          </div>

          {/* Food Image */}
          <div className="hidden lg:block">
            <div className="w-80 h-80 relative">
              <Image
                src="food.svg"
                alt="Delicious food bowl"
                width={320}
                height={320}
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Meals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredMeals.map((meal) => (
              <Card
                key={meal.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={meal.image || "/placeholder.svg"}
                    alt={meal.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {meal.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2 relative">
                    <div
                      className={`w-8 h-8 ${meal.brandColor} rounded flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {meal.brandInitial}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(
                          openDropdown === meal.id ? null : meal.id
                        );
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="text-lg">⋯</span> {/*botton*/}
                    </button>
                    {openDropdown === meal.id && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-20 z-10">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditMeal(meal);
                            setEditModalOpen(true);
                            setOpenDropdown(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteMeal(meal);
                            setDeleteModalOpen(true);
                            setOpenDropdown(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {meal.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {meal.rating}
                    </span>
                  </div>
                  <Badge
                    className={`${meal.statusColor} text-white text-xs px-2 py-1`}
                  >
                    {meal.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-2">
              View More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Partner with us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ride with us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Refund & Cancellation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4 mb-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Receive exclusive offers in your mailbox
              </p>
              <div className="flex">
                <Input
                  placeholder="Enter Your email"
                  className="bg-gray-800 border-gray-700 text-white flex-1 rounded-r-none"
                />
                <Button className="bg-orange-400 hover:bg-orange-500 rounded-l-none">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              All rights Reserved © Your Company, 2023
            </p>
            <p className="text-gray-400 text-sm">Made with ❤️ by Themewagon</p>
          </div>
        </div>
      </footer>
      {/* Add Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
              Add a meal
            </h2>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Food name"
                  className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <p className="text-red-500 text-sm mt-1">
                  Food name is required
                </p>
              </div>

              <input
                type="text"
                placeholder="Food rating"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Food image (link)"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Restaurant name"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Restaurant logo (link)"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />

              <select className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-500">
                <option>Restaurant status (open/close)</option>
                <option>Open</option>
                <option>Closed</option>
              </select>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-400 text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Meal Modal */}
      {editModalOpen && editMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
              Edit Meal
            </h2>
            <form className="space-y-4">
              <div>
                <input
                  name="food_name"
                  type="text"
                  value={editForm.food_name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, food_name: e.target.value })
                  }
                  placeholder="Food name"
                  className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <p className="text-red-500 text-sm mt-1" id="food-name-error">
                  Food name is required
                </p>
              </div>
              <input
                name="food_rating"
                type="number"
                value={editForm.food_rating}
                onChange={(e) =>
                  setEditForm({ ...editForm, food_rating: e.target.value })
                }
                placeholder="Food rating"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                name="food_image"
                type="text"
                value={editForm.food_image}
                onChange={(e) =>
                  setEditForm({ ...editForm, food_image: e.target.value })
                }
                placeholder="Food image (link)"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                name="restaurant_name"
                type="text"
                value={editForm.restaurant_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, restaurant_name: e.target.value })
                }
                placeholder="Restaurant name"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                name="restaurant_logo"
                type="text"
                value={editForm.restaurant_logo}
                onChange={(e) =>
                  setEditForm({ ...editForm, restaurant_logo: e.target.value })
                }
                placeholder="Restaurant logo (link)"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
              <select
                name="restaurant_status"
                className="w-full p-3 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-orange-400 focus:outline-none text-gray-500"
                value={editForm.restaurant_status}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    restaurant_status: e.target.value,
                  })
                }
              >
                <option value="">Restaurant status (open/close)</option>
                <option value="Open Now">Open Now</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  className="flex-1 bg-orange-400 text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition-colors"
                  onClick={() => setEditModalOpen(false)}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Meal Modal */}
      {deleteModalOpen && deleteMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
              Delete Meal
            </h2>
            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{deleteMeal.name}</span>?
            </p>
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                className="flex-1 bg-orange-400 text-white py-3 rounded-lg font-medium hover:bg-orange-500 transition-colors"
                onClick={() => {
                  // TODO: Call API to delete
                  setDeleteModalOpen(false);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
