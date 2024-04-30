import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 py-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image
          src="/promo01.png"
          alt="Banner promocional até 30% de desconto em pizzas"
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList />
    </>
  );
};

export default Home;
