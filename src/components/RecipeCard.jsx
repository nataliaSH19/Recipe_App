import React, { useState } from 'react'
import { Heart, HeartPulse, Soup } from 'lucide-react'

const RecipeCard = ({ recipe, bg, badge }) => {
    const [isFavorite, setIsFavorite] = useState(localStorage.getItem("favorites")?.includes(recipe.label));

    const addRecipeToFavorites = (e) => {
        e.preventDefault();
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.label !== recipe.label);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };


    return (
        <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative shadow-xl`} >
            <a
                href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
                target='_blank'
                className='relative h-32'>
                <div className='skeleton absolute inset-0' />
                <img
                    src={recipe.image}
                    alt="photo"
                    className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500'
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";

                    }} />
                <div className='absolute bottom-2 left-2 flex gap-1 bg-white rounded-full p-1 cursor-pointer items-center'><Soup size={"12"} />{recipe.yield}Servings</div>
                <div className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer ' onClick={addRecipeToFavorites}>
                    {!isFavorite && <Heart size={"20"} className='hover:fill-red-500 hover:text-red-500' />}
                    {isFavorite && <Heart size={"20"} className='fill-red-500 text-red-500' />}
                </div>
            </a>
            <div className='flex mt-1'>
                <p className='font-bold tracking-wide'>{recipe.label}</p>
            </div>
            <p className='my-2'>{recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen</p>
            <div className='flex gap-2 mt-auto'>
                {recipe.healthLabels.slice(0, 2).map((label, index) => (
                    <div className={`flex gap-1 ${badge} items-center p-1 rounded-md`} key={index}>
                        <HeartPulse size={16} />
                        <span className='text-sm tracking-tighter font-semibold'>{label}</span>
                    </div>
                ))}

            </div>
        </div >
    )
}

export default RecipeCard