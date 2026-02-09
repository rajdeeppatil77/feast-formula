import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FoodCard } from '@/components/FoodCard';
import { foodItems } from '@/lib/data';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      <Hero />

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Popular Dishes</h2>
          <a href="/shop" className="text-primary hover:text-primary-hover font-medium transition-colors">
            View All &gt;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.slice(0, 3).map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-dark-lighter/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-3xl bg-dark border border-white/5">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-3xl">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Delivery within 30 minutes to your doorstep, guaranteed.</p>
            </div>
            <div className="p-6 rounded-3xl bg-dark border border-white/5">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-3xl">🥗</div>
              <h3 className="text-xl font-bold text-white mb-2">Fresh Food</h3>
              <p className="text-gray-400">We use only the freshest ingredients for our meals.</p>
            </div>
            <div className="p-6 rounded-3xl bg-dark border border-white/5">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-3xl">💎</div>
              <h3 className="text-xl font-bold text-white mb-2">Best Quality</h3>
              <p className="text-gray-400">Award-winning chefs preparing your favorite dishes.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
