import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=7");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=7");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=3");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-3 px-3 max-w-6xl mx-aut text-center my-4	mx-auto">
        <h1 className="text-slate-700 font-bold text-sm lg:text-2xl">
        في عالم الإعلام الرقمي، يمر كل يوم بتطورات جديدة تؤثر على طريقة تقديم الأخبار والمعلومات. مشروعنا يهدف إلى استكشاف هذا التطور من خلال <br /> <span className="text-sky-600">رحلة عبر الزمن</span>
          <br />
          تتيح لكم معرفة كيف تغيّر الإعلام منذ بداياته حتى اليوم.
        </h1>
        <div className="text-gray-700 text-xl sm:text-sm">
        ماذا نقدم؟
        <br />
تاريخ الإعلام: استعرضوا معنا كيف تطور الإعلام عبر السنوات، من الجرائد التقليدية إلى الوسائط الرقمية الحديثة.
<br/>
محتوى تفاعلي: اختاروا الفترة الزمنية التي تهمكم واستمتعوا بمشاهدة مقاطع الفيديو والمحتوى الذي يسلط الضوء على التغييرات الرئيسية في تقديم الأخبار.
<br />
مقابلات مع خبراء: تعرفوا على تجارب وإلهامات إعلاميين بارزين يشاركوننا رؤاهم حول تطور الإعلام وكيف يؤثر على المجتمع.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          هيا بنا نبدأ
        </Link>
      </div>
      {/*
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
                key={listing._id}
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      */}
      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-3">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                الإذاعة
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                إعرض المزيد
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                التليفزيون
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                إعرض المزيد
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                الصحافة
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
              إعرض المزيد
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
