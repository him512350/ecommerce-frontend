import Image from "next/image";
import Link from "next/link";
import HeroSlider from "./components/home/HeroSlider";
import ProductSection from "./components/home/ProductSection";
import FeaturedBanner from "./components/home/FeaturedBanner";
import VideoSection from "./components/home/VideoSection";
import InstagramSection from "./components/home/InstagramSection";
import ProductCard from "./components/home/ProductCard";

const easterGlowProducts = [
  {
    id: 223097,
    name: "【 2026 Easter Glow Set A 】✶ Anti-Blemish Duo",
    slug: "2026-easter-glow-set-a-anti-blemish-duo",
    price: "HK$1,488",
    comparePrice: "HK$2,359",
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM.jpeg?resize=300%2C300&ssl=1",
    onSale: true,
  },
  {
    id: 223099,
    name: "【 2026 Easter Glow Set C 】✶ Wonder Renew Kit",
    slug: "2026-easter-glow-set-c-wonder-renew-kit",
    price: "HK$798",
    comparePrice: "HK$998",
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-2.jpeg?resize=300%2C300&ssl=1",
    onSale: true,
  },
  {
    id: 223085,
    name: "【 2026 Easter Glow Set B 】✶ Ultimate Repairing Trio",
    slug: "2026-easter-glow-set-b-ultimate-repairing-trio",
    price: "HK$587",
    comparePrice: "HK$734",
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-03-26-at-6.02.51-PM-1.jpeg?resize=300%2C300&ssl=1",
    onSale: true,
  },
];

const monthlyPromoProducts = [
  {
    id: 223146,
    name: "【 𝟒月優惠 𝐒𝐞𝐭 𝐁 ✶ 𝐃𝐞-𝐁𝐥𝐞𝐦𝐢𝐬𝐡 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧 】",
    slug: "202604-setb-de-blemish-solution",
    price: "HK$728",
    comparePrice: "HK$809",
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetB-Icon_p1.jpg?resize=300%2C300&ssl=1",
    onSale: true,
  },
  {
    id: 223125,
    name: "【 𝟒月優惠 𝐒𝐞𝐭 𝐀 ✶ 𝐑𝐚𝐝𝐢𝐚𝐧𝐭 𝐁𝐫𝐢𝐠𝐡𝐭𝐞𝐧𝐢𝐧𝐠 𝐒𝐞𝐭 】",
    slug: "202604-seta-radiant-brightening-set",
    price: "HK$818",
    comparePrice: "HK$909",
    image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/SetA-Icon-p1.jpg?resize=300%2C300&ssl=1",
    onSale: true,
  },
];

const wonderAromaProducts = [
  { id: 222087, name: "STARRYTALE｜Woodsy Whisper Eau De Parfum｜森語輕吟香水｜50ml", slug: "starrytale-woodsy-whisper-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Woodsy-Whisper-50ml.png?resize=300%2C300&ssl=1" },
  { id: 222123, name: "STARRYTALE｜Soulwood Eau De Parfum｜靈木之境香水｜50ml", slug: "starrytale-soulwood-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Soulwood-50ml.png?resize=300%2C300&ssl=1" },
  { id: 222132, name: "STARRYTALE｜Deja Whisper Eau De Parfum｜寐語迴聲香水｜50ml", slug: "starrytale-deja-whisper-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Deja-Whisper-50ml.png?resize=300%2C300&ssl=1" },
  { id: 222066, name: "STARRYTALE｜The Glow Eau De Parfum｜微光之耀香水｜50ml", slug: "starrytale-the-glow-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-The-Glow-50ml.png?resize=300%2C300&ssl=1" },
  { id: 222100, name: "STARRYTALE｜Moonlit Dream Eau De Parfum｜星夜月光香水｜50ml", slug: "starrytale-moonlit-dream-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Moonlit-Dream-50ml.png?resize=300%2C300&ssl=1" },
  { id: 222039, name: "STARRYTALE｜Roses Of The Canopy Eau De Parfum｜秘林玫影｜50ml", slug: "starrytale-roses-of-the-canopy-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Roses-Of-The-Canopy-50ml-2.png?resize=300%2C300&ssl=1" },
  { id: 222078, name: "STARRYTALE｜Liar Liar Eau De Parfum｜幻夢謊言香水｜50ml", slug: "starrytale-liar-liar-eau-de-parfum-50ml", price: "HK$738", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2026/03/Wonder-Aroma-Odyssey-Liar-Liar-50ml.png?resize=300%2C300&ssl=1" },
];

const starrytaleNewProducts = [
  { id: 219919, name: "STARRYTALE | N.40 Silky Eye Wonder｜絲光緊緻淡紋眼膜", slug: "starrytale-n-40-silky-eye-wonder", price: "HK$399", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/10/N.40-1-2.png?resize=300%2C300&ssl=1" },
  { id: 211370, name: "STARRYTALE | N.43 Wonder Timeless Lifting Mist | 逆齡奇蹟水 | 30mle", slug: "starrytale-n-43-wonder-timeless-lifting-mist", price: "HK$168", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/for-pos-53-56-1.png?resize=300%2C300&ssl=1" },
  { id: 211366, name: "STARRYTALE | Wonder Softest Kissy Lip Fix (Transparent) | 柔嫩護唇精華", slug: "starrytale-wonder-softest-kissy-lip-fix-transparent", price: "HK$249", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/Wonder-Softest-Kissy-Lip-Fix-transparent-box.png?resize=300%2C300&ssl=1" },
  { id: 208706, name: "STARRYTALE | N.48 Wonder Ceramide Creamy Therapy｜皇牌極潤修護療膜", slug: "starrytale-n-48-wonder-ceramide-creamy-therapy", price: "HK$549", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/for-pos-53-57.png?resize=300%2C300&ssl=1" },
  { id: 209684, name: "STARRYTALE｜Sandalwood Lullaby Candle｜檀木搖籃曲蠟燭｜190g", slug: "starrytale-sandalwood-lullaby-candle-190g", price: "HK$288", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/candle-Sandalwood-Lullaby-190g-box.png?resize=300%2C300&ssl=1" },
  { id: 209665, name: "STARRYTALE｜Dreamer's Fig Blossom Candle｜無花果之夢蠟燭｜190g", slug: "starrytale-dreamers-fig-blossom-candle-190g", price: "HK$288", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/candle-SDreamers-Fig-Blossom-190g-box.png?resize=300%2C300&ssl=1" },
  { id: 209688, name: "STARRYTALE｜Soft Orchard Dream Candle｜果香漫步蠟燭｜190g", slug: "starrytale-soft-orchard-dream-candle-190g", price: "HK$288", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/candle-Soft-Orchard-Dream-190g-box.png?resize=300%2C300&ssl=1" },
  { id: 209691, name: "STARRYTALE｜Saffron Rosebeam Candle｜藏紅花玫光蠟燭｜190g", slug: "starrytale-saffron-rosebeam-candle-190g", price: "HK$288", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2025/11/candle-Saffron-Rosebeam-190g-box.png?resize=300%2C300&ssl=1" },
];

const bestSellersProducts = [
  { id: 169898, name: "STARRYTALE｜N.38 Wonder Treatment Mask｜極致細胞修復面膜｜5pcs/box", slug: "starrytale-n-38-wonder-treatment-mask", price: "HK$459", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2023/08/N38.png?resize=300%2C300&ssl=1" },
  { id: 125474, name: "STARRYTALE｜N.35 Wonder Waterful Copper Mask｜皇牌藍銅水光面膜｜5pcs/box", slug: "starrytale-n-35-wonder-waterful-copper-mask", price: "HK$399", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2023/11/N35.png?resize=300%2C300&ssl=1" },
  { id: 115531, name: "STARRYTALE｜N.8 Wonder Serum｜皇牌全效精華｜30mle", slug: "starrytale-n-8-wonder-serum-30mle", price: "HK$529", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2023/08/New_N8_30ml.png?resize=300%2C300&ssl=1", rating: 5, reviewCount: 1 },
  { id: 46648, name: "STARRYTALE｜N.15 Wonder Treatment Cream｜極致細胞修復全效面霜｜30mle", slug: "starrytale-n15-wonder-treatment-cream", price: "HK$699", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2022/10/n15_60ml.png?resize=300%2C300&ssl=1", rating: 5, reviewCount: 1 },
  { id: 37154, name: "STARRYTALE｜N.1 Pure Plump｜極緻水光精華｜JUMBO 50mle", slug: "starrytale-n1-pure-plump-50ml", price: "HK$950", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2021/11/NNew_N1_jumbo-2.png?resize=300%2C300&ssl=1" },
  { id: 8506, name: "STARRYTALE｜N.3 Wonder Mask｜皇牌全效面膜｜5pcs/box", slug: "starrytale-n3-wonder-mask", price: "HK$338", image: "https://i0.wp.com/littlestardusthk.com/wp-content/uploads/2020/09/1%E6%96%B0n3.png?resize=300%2C300&ssl=1", rating: 5, reviewCount: 4 },
];

function Divider() {
  return <div style={{ borderTop: "1px solid #eaeaea", margin: "0 20px" }} />;
}

function BestSellersSection({ products }: { products: typeof bestSellersProducts }) {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
        <div>
          <Link href="/products/starrytale-n3-wonder-mask-jumbo-10pcs-box">
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
              <Image
                src="https://i0.wp.com/littlestardusthk.com/wp-content/uploads/elementor/thumbs/WEB_n3--ph71rozfg1w1n6qvf19nx3ji4awwnprynarrfz6auc.jpg?w=1200&ssl=1"
                alt="N.3 Wonder Mask Jumbo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </Link>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#333", marginBottom: 24 }}>
            <strong>Best Sellers</strong>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <Divider />
      <ProductSection title="Easter Glow<br/>Promotion" products={easterGlowProducts} columns={3} viewAllHref="/shop/product-category/monthlyset" />
      <Divider />
      <ProductSection title="Monthly<br/>Promotion Set" products={monthlyPromoProducts} columns={2} viewAllHref="/shop/product-category/monthlyset" />
      <Divider />
      <ProductSection title="Wonder Aroma<br/>Odyssey" products={wonderAromaProducts} columns={4} viewAllHref="/shop/product-category/special-item" />
      <Divider />
      <ProductSection title="Starrytale<br/>New Product" products={starrytaleNewProducts} columns={4} viewAllHref="/shop/product-category/new" />
      <VideoSection />
      <Divider />
      <BestSellersSection products={bestSellersProducts} />
      <FeaturedBanner />
      <Divider />
      <InstagramSection />
    </main>
  );
}
