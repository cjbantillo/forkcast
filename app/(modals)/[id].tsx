import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

const router = useRouter();

const Recipe = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = "1cae230634f645e694f74c6da042ef80";

        const [ingredientsRes, infoRes, nutritionRes] = await Promise.all([
          fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`),
          fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`),
          fetch(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`)
        ]);

        const ingredientsData = await ingredientsRes.json();
        const infoData = await infoRes.json();
        const nutritionData = await nutritionRes.json();

        setRecipe({
          ingredients: ingredientsData.ingredients,
          title: infoData.title,
          image: infoData.image,
          nutrition: nutritionData,
        });

      } catch (error) {
        console.error("Failed to fetch recipe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E69145" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: recipe.image }}
      style={styles.background}
      imageStyle={{ height: 500 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent']}
        style={styles.titleOverlay}
      >
        <Pressable onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/'); // or a specific screen like '/home'
          }
        }} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={20} color="#fff" />
        </Pressable>

        <Text style={styles.dishTitle}>{recipe.title}</Text>

        <View style={styles.nutritionContainer}>
          {[
            { label: "Calories", value: recipe.nutrition.calories },
            { label: "Protein", value: recipe.nutrition.protein },
            { label: "Carbs", value: recipe.nutrition.carbs },
            { label: "Fat", value: recipe.nutrition.fat },
          ].map((item) => (
            <View key={item.label} style={styles.nutrientBox}>
              <Text style={styles.nutrientLabel}>{item.label}</Text>
              <Text style={styles.nutrientValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>


        <View style={styles.ingredientCard}>
          <Text style={styles.title}>Ingredients</Text>
          {recipe.ingredients.map((item: any, index: number) => (
            <View key={index} style={styles.ingredientItem}>
              <Image
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                }}
                style={styles.ingredientImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <Text style={styles.ingredientAmount}>
                  {item.amount.metric.value} {item.amount.metric.unit}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleOverlay: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    maxHeight: 500,
  },
  dishTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  ingredientCard: {
    borderRadius: 20,
    backgroundColor: "#FFFEEE",
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ingredientAmount: {
    fontSize: 14,
    color: "#555",
  },
  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  nutrientBox: {
    alignItems: "center",
  },
  nutrientLabel: {
    fontSize: 14,
    color: "#555",
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E69145",
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: 10,
    marginBottom: 30,
  },
  
});

export default Recipe;

