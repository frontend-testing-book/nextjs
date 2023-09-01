useContext について学ぶ

context を使用すると親コンポーネントから props を明示的に渡さずとも、任意のコンポーネントが情報を受け取れるようにできる。

```
const value = useContext(SomeContext)
```

## サブスクライブしますってなに？

サブスクライブとは、何か情報の更新があった場合などに、`通知を受け取ること` を示します。
React では、useState などによる状態の変化をサブスクライブし、component を新しいデータをもとに再レンダリングします。

## 情報の種別って何？

useContext で作れるのは、格納しておく場所となる。この場所が種別ということ
その中に何が入っているかは知らない。ユーザーが決めることとなる。
実際に使用するときはまず"格納しておいた場所"を呼び出し、その中から自由にデータを取り出す。この場所が useContext である。

## createContext、provider、useContext の役割をざっくり説明

```
createContext : React空間に、データを共有できる道具箱を作れる
const hgoe = createContext()として使い、hogeはproviderを持っている
providerは、道具箱を共有するための領域範囲する役割と、道具箱の中に実際のデータを詰め込む役割がある。

<hoge.provider value={name:"taro"}>
  {children}
</hoge.provider>
こうすることで、childrenに道具箱とその中身(value)を渡すことができる。

childrenはuseContext(hoge)とすることで道具箱を呼び出す権利を得る。
const {name} = useContext(hoge)とすることで道具箱からデータを取得できる
```

provider に持たせる値は、固定値だけでなく更新できるデータもわたせる。

useState を使う。

```
//親側
const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={theme}>


//子供側
const { theme, setTheme } = useContext(MyContext);
```

## 普遍のデフォルト値

aaa
