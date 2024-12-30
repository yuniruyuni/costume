export type Costume = {
  id: string;
  name: string;
  thumbnail: string;
  image: string;
  author: string;
  booth: string;
  comment: string;
};

export const rawCostumes: Omit<Costume, "thumbnail" | "image">[] = [
  {
    id: "dreamy_step",
    name: "Dreamy Step",
    author: "寺井カントリー",
    booth: "https://booth.pm/ja/items/5420885",
    comment: "いつも標準で使っているお洋服。メガネバージョンとかもあります。",
  },
  {
    id: "kannagi_sakura",
    name: "巫桜",
    author: "asapidock",
    booth: "https://booth.pm/ja/items/5646504",
    comment:
      "「かんなぎざくら」と読むらしい。FF10配信でこういう感じの和服がほしい！っていうのを探したら見つかったまさにいい感じの巫女服。それだけじゃなくて質も良くて気に入ってます。",
  },
  {
    id: "ms03",
    name: "星宮仕えの天使さん",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/5646504",
    comment:
      "「宇宙におわす女神様に仕える天使をイメージした衣装」らしいです。かわいい！",
  },
  {
    id: "ms02_a",
    name: "星術科制服",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/4702665",
    comment:
      "しばしばMicrosoft Flight Simulatorで飛行機を飛ばすときにお借りしているお洋服。機長っぽくない？",
  },
  /*
  {
    id: "ms02_b",
    name: "星術科礼装",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/4702665",
    comment: "",
  },
  */
  {
    id: "ms01_white",
    name: "跋星の白装v2",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/3622367",
    comment:
      "コートの星がとーてもかわいいです✨️で、でも私にはお洋服の名前の読み方がわからない...なんて読むんだろう＠＠；",
  },
  {
    id: "ms01_blue",
    name: "天溢の蒼衣v2",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/3622367",
    comment:
      "これもとってもかわいいです〜✨️アイドル感ある。ただやっぱり私にはお洋服の名前の読み方がわからない...なんて読むんだろう＠＠；",
  },
  {
    id: "keita_maruyama_kimono_2023",
    name: "KEITAMARUYAMA3D着物2023",
    author: "©️KEITAMARUYAMA",
    booth: "https://booth.pm/ja/items/5378258",
    comment: "KEITA MARUYAMAさんの2023年の着物！質感のよく出来た和服です〜✨️",
  },
  {
    id: "lily_bell_reorder",
    name: "Lily Bell - ReOrder",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5691110",
    comment: "とても布の表現のできが良いかわいいメイドさんです✨️",
  },
  {
    id: "non_transformed",
    name: "Prelude",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5134409",
    comment: "変身ギミックのついているお洋服です✨️️高校生とかそんなイメージ。",
  },
  {
    id: "transformed",
    name: "Prelude(Transformed)",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5134409",
    comment:
      "Preludeの変身ギミックをONにした状態です✨️アイドル衣装っぽくなる。",
  },
  {
    id: "little_queen",
    name: "LittleQueen",
    author: "choco*shop",
    booth: "https://booth.pm/ja/items/6178156",
    comment: "質感の素敵な衣装です～。",
  },
  {
    id: "night_in_yoshiwara",
    name: "ナイト・イン・ヨシワラ",
    author: "©Vagrant",
    booth: "https://booth.pm/ja/items/",
    comment: "とてもセクシーなアバター衣装です✨️",
  },
  {
    id: "sailor_loli_re",
    name: "Re:セーラーロリ",
    author: "かぷちや",
    booth: "https://booth.pm/ja/items/4871296",
    comment:
      "かぷちやさんの素敵衣装〜。透明感がいい感じ✨️カーディガンがついてるのでVRCではつけたり外したりできます🌟",
  },
  {
    id: "secret_garden",
    name: "SecretGarden",
    author: "©ottotto/POTATOTO",
    booth: "https://booth.pm/ja/items/6169513",
    comment:
      "頭の花冠が素敵なお花って感じのシークレットガーデン。杖とか持てば魔法使い感があるかも",
  },
  {
    id: "snow_bell",
    name: "スノーベル",
    author: "Radiant-Iseo",
    booth: "https://booth.pm/ja/items/6370137",
    comment: "サンタガール感もちょっとあるスノーベル。冬にピッタリ🌟",
  },
  {
    id: "snow_spirit",
    name: "Snow Spirit / スノウスピリット",
    author: "©Riisya Sweets",
    booth: "https://booth.pm/ja/items/6403595",
    comment:
      "クリスマスモチーフなスノウスピリット。とても可愛くクリスマス配信なんかで大活躍🌟",
  },
  {
    id: "oneisan_code",
    name: "お姉さんコーデ",
    author: "北極狐",
    booth: "https://booth.pm/ja/items/6274337",
    comment: "おねーさんだぞ✨️",
  },
  {
    id: "lucca_style",
    name: "ルッカ風",
    author: "cherry neru",
    booth: "https://booth.pm/ja/items/5628717",
    comment:
      "クロノ・トリガー配信で使っているお洋服。この衣装は上記以外にも複数の衣装の組み合わせで実現しています。スカーフ部分はReさいくるしょっぷさまのRe-scarf-, ヘルメットは部屋の四隅さまのOPSCORE, バッグは天江製作所さまのウエストバッグを使用させていただきました。",
  },
];

export const costumes = rawCostumes.map((costume) => ({
  ...costume,
  thumbnail: `thumbnails/${costume.id}.png`,
  image: `images/${costume.id}.png`,
}));
