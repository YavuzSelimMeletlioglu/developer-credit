# developer-credit

Sitelerin footer'ında kullanılan geliştirici imzası. Bağımlılığı olmayan bir web bileşenidir.

> Tasarım ve kodlama: **Yavuz Selim Meletlioğlu**

İsim kalındır ve LinkedIn profilini yeni sekmede açar. Metin `tr`, `en`, `de`, `ru` ve `ar` dillerinde gelir. Arapçada yön sağdan sola ayarlanır. Desteklenmeyen dil İngilizceye düşer.

## Kurulum

```bash
npm install git+https://github.com/YavuzSelimMeletlioglu/developer-credit.git
```

## Kullanım

```html
<developer-credit lang="tr"></developer-credit>
```

`lang` verilmezse en yakın üst öğenin `lang` değeri, o da yoksa `<html lang>` kullanılır.

Bileşeni sayfada bir kez içe aktarmak yeterlidir:

```js
import 'developer-credit';
```

### SvelteKit / Astro

```svelte
<script>
	import 'developer-credit';
</script>

<developer-credit {lang}></developer-credit>
```

Astro'da `<script>import 'developer-credit';</script>` ekle. Sayfa JavaScript yüklenmeden önce de link görünsün istersen etiketin içine yedek bir bağlantı koy; bileşen yüklenince içeriği kendisi değiştirir:

```html
<developer-credit lang="tr"><a href="https://www.linkedin.com/in/yavuzselim-meletlioglu/">Yavuz Selim Meletlioğlu</a></developer-credit>
```

### React

```jsx
import 'developer-credit';

<developer-credit lang="tr" />
```

TypeScript kullanıyorsan projeye bir kez şunu ekle:

```ts
declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'developer-credit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { lang?: string };
		}
	}
}
```

## Renkler

Bileşen shadow DOM kullanmaz, bu yüzden sitenin yazı tipi ve rengini miras alır. İnce ayar için iki CSS değişkeni vardır:

```css
developer-credit {
	--credit-link: var(--ink);
	--credit-link-hover: var(--gold);
}
```

## Test

```bash
npm test
```
