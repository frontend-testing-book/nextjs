useEffect 
外部システムと同期させるためのReactフック
コンポーネントのトップレベルで呼び出す。


## 引数の役割

useEffect(引数1 , 引数2)

引数1
関数を入れる。
コンポーネントが初めてDOMに追加されると実行される。

引数2
依存配列。
依存配列にいれた値が更新されたら
1,クリーンアップ関数を実行
  - コンポーネントがページから消えるとreturnが実行される
2,引数1の関数を実行。

配列なので、複数入れることができる。(変数も関数も入る)
useEffect(引数1 , [hoge,huga,foo])

引数2は省略可能。ただしその場合、毎回のレンダーの後に再実行される。

注意点
ループやifの後に書けない。
Strict Modeの場合、開発専用にセットアップ＋クリーンアップサイクルが1回追加で実行される。
無限ループの可能性がある。(useStateのsetを入れた時など)

## カスタムフック

別仮数にし、共通化可能。

```ts
function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

}

  //componetで使う
  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
```