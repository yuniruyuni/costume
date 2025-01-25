export type Costume = {
  id: string;
  name: string;
  thumbnail: string;
  image: string;
  author: string;
  booth: string;
  comment: string;
  vrchat_only: boolean;
};

export const rawCostumes: Omit<Costume, "thumbnail" | "image">[] = [
  {
    id: "dreamy_step",
    name: "Dreamy Step",
    author: "寺井カントリー",
    booth: "https://booth.pm/ja/items/5420885",
    comment: "いつも標準で使っているお洋服。メガネバージョンとかもあります。",
    vrchat_only: false,
  },
  {
    id: "kannagi_sakura",
    name: "巫桜",
    author: "asapidock",
    booth: "https://booth.pm/ja/items/5646504",
    comment:
      "「かんなぎざくら」と読むらしい。FF10配信でこういう感じの和服がほしい！っていうのを探したら見つかったまさにいい感じの巫女服。それだけじゃなくて質も良くて気に入ってます。",
    vrchat_only: false,
  },
  {
    id: "ms03",
    name: "星宮仕えの天使さん",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/5054313",
    comment:
      "「宇宙におわす女神様に仕える天使をイメージした衣装」らしいです。かわいい！",
    vrchat_only: false,
  },
  {
    id: "ms02_a",
    name: "星術科制服",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/4702665",
    comment:
      "しばしばMicrosoft Flight Simulatorで飛行機を飛ばすときにお借りしているお洋服。機長っぽくない？",
    vrchat_only: false,
  },
  /*
  {
    id: "ms02_b",
    name: "星術科礼装",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/4702665",
    comment: "",
    vrchat_only: false,
  },
  */
  {
    id: "ms01_white",
    name: "跋星の白装v2",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/3622367",
    comment:
      "コートの星がとーてもかわいいです✨️で、でも私にはお洋服の名前の読み方がわからない...なんて読むんだろう＠＠；",
    vrchat_only: false,
  },
  {
    id: "ms01_blue",
    name: "天溢の蒼衣v2",
    author: "みさくらやさん",
    booth: "https://booth.pm/ja/items/3622367",
    comment:
      "これもとってもかわいいです〜✨️アイドル感ある。ただやっぱり私にはお洋服の名前の読み方がわからない...なんて読むんだろう＠＠；",
    vrchat_only: false,
  },
  {
    id: "keita_maruyama_kimono_2023",
    name: "KEITAMARUYAMA3D着物2023",
    author: "©️KEITAMARUYAMA",
    booth: "https://booth.pm/ja/items/5378258",
    comment: "KEITA MARUYAMAさんの2023年の着物！質感のよく出来た和服です〜✨️",
    vrchat_only: false,
  },
  {
    id: "lily_bell_reorder",
    name: "Lily Bell - ReOrder",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5691110",
    comment: "とても布の表現のできが良いかわいいメイドさんです✨️",
    vrchat_only: false,
  },
  {
    id: "non_transformed",
    name: "Prelude",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5134409",
    comment: "変身ギミックのついているお洋服です✨️️高校生とかそんなイメージ。",
    vrchat_only: false,
  },
  {
    id: "transformed",
    name: "Prelude(Transformed)",
    author: "©Sweet Serenade",
    booth: "https://booth.pm/ja/items/5134409",
    comment:
      "Preludeの変身ギミックをONにした状態です✨️アイドル衣装っぽくなる。",
    vrchat_only: false,
  },
  {
    id: "little_queen",
    name: "LittleQueen",
    author: "choco*shop",
    booth: "https://booth.pm/ja/items/6178156",
    comment: "質感の素敵な衣装です～。",
    vrchat_only: false,
  },
  {
    id: "night_in_yoshiwara",
    name: "ナイト・イン・ヨシワラ",
    author: "©Vagrant",
    booth: "https://booth.pm/ja/items/5359699",
    comment: "とてもセクシーなアバター衣装です✨️Twitchの配信ガイドライン的に厳しいので規制のゆるいVRC以外だと色々制約があるかも。",
    vrchat_only: false,
  },
  {
    id: "sailor_loli_re",
    name: "Re:セーラーロリ",
    author: "かぷちや",
    booth: "https://booth.pm/ja/items/4871296",
    comment:
      "かぷちやさんの素敵衣装〜。透明感がいい感じ✨️カーディガンがついてるのでVRCではつけたり外したりできます🌟",
    vrchat_only: false,
  },
  {
    id: "secret_garden",
    name: "SecretGarden",
    author: "©ottotto/POTATOTO",
    booth: "https://booth.pm/ja/items/6169513",
    comment:
      "頭の花冠が素敵なお花って感じのシークレットガーデン。杖とか持てば魔法使い感があるかも",
    vrchat_only: false,
  },
  {
    id: "snow_bell",
    name: "スノーベル",
    author: "Radiant-Iseo",
    booth: "https://booth.pm/ja/items/6370137",
    comment: "サンタガール感もちょっとあるスノーベル。冬にピッタリ🌟",
    vrchat_only: false,
  },
  {
    id: "snow_spirit",
    name: "Snow Spirit / スノウスピリット",
    author: "©Riisya Sweets",
    booth: "https://booth.pm/ja/items/6403595",
    comment:
      "クリスマスモチーフなスノウスピリット。とても可愛くクリスマス配信なんかで大活躍🌟",
    vrchat_only: false,
  },
  {
    id: "oneisan_code",
    name: "お姉さんコーデ",
    author: "北極狐",
    booth: "https://booth.pm/ja/items/6274337",
    comment: "おねーさんだぞ✨️",
    vrchat_only: false,
  },
  {
    id: "lucca_style",
    name: "ルッカ風",
    author: "cherry neru",
    booth: "https://booth.pm/ja/items/5628717",
    comment:
      "クロノ・トリガー配信で使っているお洋服。この衣装は上記以外にも複数の衣装の組み合わせで実現しています。スカーフ部分はReさいくるしょっぷさまのRe-scarf-, ヘルメットは部屋の四隅さまのOPSCORE, バッグは天江製作所さまのウエストバッグを使用させていただきました。",
    vrchat_only: false,
  },
  {
    id: "furisode_set",
    name: "振袖セット",
    author: "hajimata雑貨店",
    booth: "https://booth.pm/ja/items/6428475",
    comment: "「あけましておめでとうございます」的な雰囲気でいきたいときに✨️",
    vrchat_only: false,
  },
  {
    id: "star_dream",
    name: "星清 -StarDream-",
    author: "もやししなしな",
    booth: "https://moyashichan.booth.pm/items/6330532",
    comment: "RTA in VRChatの第一回に倫葉さんの0Exitの解説役で参加したときに、同じく参加者(タイムコマンダー走者)だった「もやしちゃん」さんが作って同日ランの後に宣伝していた服！ついその場で購入してしまった✨️ デザインがよくてかわいい✨️",
    vrchat_only: false,
  },
];

export const costumes = rawCostumes.map((costume) => ({
  ...costume,
  thumbnail: `/thumbnails/${costume.id}.png`,
  image: `/images/${costume.id}.png`,
}));
