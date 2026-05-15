import { useLocation } from "wouter";

const menuItems = [
  { emoji: "🎂", title: "Ulang Tahun Bubu", path: "/birthday", from: "from-rose-100", to: "to-pink-200" },
  { emoji: "🥺", title: "Minta Maaf...", path: "/apology", from: "from-purple-100", to: "to-pink-100" },
  { emoji: "💗", title: "Rasa Sayangnya Akuu", path: "/love", from: "from-pink-100", to: "to-red-100" },
  { emoji: "🌙", title: "Harapan Masa Depan sama Bubu", path: "/future", from: "from-indigo-100", to: "to-purple-100" },
  { emoji: "📬", title: "Open When...", path: "/open-when", from: "from-amber-100", to: "to-yellow-100" },
  { emoji: "📸", title: "Galeri Kitaa", path: "/gallery", from: "from-teal-100", to: "to-green-100" },
  { emoji: "💌", title: "Pesan untuk Bubu", path: "/messages", from: "from-rose-100", to: "to-orange-100" },
  { emoji: "📅", title: "Timeline Kitaa", path: "/timeline", from: "from-sky-100", to: "to-blue-100" },
  { emoji: "🏆", title: "Achievement Bubu", path: "/achievements", from: "from-amber-100", to: "to-orange-100" },
  { emoji: "✨", title: "Wajib dibuka TERAKHIR", path: "/ending", from: "from-violet-100", to: "to-purple-100" },
];

function getRelationshipDuration(startDate: Date) {
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();
  let days = today.getDate() - startDate.getDate();

  if (days < 0) {
    months--;

    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 0) {
    return "0 tahun 0 bulan 0 hari";
  }

  return `${years} tahun ${months} bulan ${days} hari`;
}

export default function MainMenu() {
  const [, setLocation] = useLocation();

  const relationshipStart = new Date("2023-10-26");
  const togetherText = getRelationshipDuration(relationshipStart);

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">💑</div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Aku bikin ini semua buat bubuu</h1>
          <div className="inline-block mt-3 px-5 py-2 bg-primary/10 rounded-full">
            <p className="text-sm text-foreground">
              Kita udah bersama selama{" "}
              <span className="font-bold text-primary">{togetherText}</span>{" "}
              <span className="text-rose-400">✨</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {menuItems.map((item) => (
            <button
              key={item.path}
              data-testid={`card-menu-${item.path.replace("/", "")}`}
              onClick={() => setLocation(item.path)}
              className={`bg-gradient-to-br ${item.from} ${item.to} rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.03] transition-all duration-200 cursor-pointer`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{item.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}