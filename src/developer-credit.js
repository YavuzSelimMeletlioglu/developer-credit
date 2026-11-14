// <developer-credit>: sitelerin footer'ında kullanılan geliştirici imzası.
// Bağımlılığı yoktur; React, Astro, SvelteKit ve düz HTML'de çalışır.
// Sunucu tarafında (SSR) içe aktarmak güvenlidir: tarayıcı yoksa hiçbir şey tanımlamaz.

export const NAME = 'Yavuz Selim Meletlioğlu';
export const PROFILE_URL = 'https://www.linkedin.com/in/yavuzselim-meletlioglu/';

export const LABELS = {
	tr: 'Tasarım ve kodlama:',
	en: 'Design & development by',
	de: 'Design und Entwicklung:',
	ru: 'Дизайн и разработка:',
	ar: 'التصميم والبرمجة:'
};

const RTL_LANGS = new Set(['ar']);
const STYLE_ID = 'developer-credit-style';

/** 'tr-TR' → 'tr'. Desteklenmeyen ya da boş değer İngilizceye düşer. */
export function resolveLang(value) {
	const primary = String(value ?? '')
		.toLowerCase()
		.split('-')[0];
	return Object.hasOwn(LABELS, primary) ? primary : 'en';
}

export function dirOf(lang) {
	return RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
}

// Renkler siteden gelir: --credit-link ve --credit-link-hover verilmezse çevreden miras alınır.
function injectStyle() {
	if (document.getElementById(STYLE_ID)) return;
	const style = document.createElement('style');
	style.id = STYLE_ID;
	style.textContent =
		'developer-credit a{color:var(--credit-link,inherit);text-decoration:none}' +
		'developer-credit a:hover,developer-credit a:focus-visible{color:var(--credit-link-hover,currentColor)}';
	document.head.append(style);
}

const Base = typeof HTMLElement === 'undefined' ? class {} : HTMLElement;

export class DeveloperCredit extends Base {
	static observedAttributes = ['lang'];

	connectedCallback() {
		this.#render();
	}

	attributeChangedCallback() {
		if (this.isConnected) this.#render();
	}

	#render() {
		injectStyle();
		const own = this.getAttribute('lang');
		const lang = resolveLang(
			own ?? this.closest('[lang]')?.getAttribute('lang') ?? document.documentElement.lang
		);
		// Dil açıkça verildiyse yönü de buna göre ayarla; verilmediyse sayfanın yönünü izle.
		if (own) this.setAttribute('dir', dirOf(lang));

		const label = document.createElement('span');
		label.textContent = LABELS[lang];

		const link = document.createElement('a');
		link.href = PROFILE_URL;
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		const strong = document.createElement('strong');
		const name = document.createElement('bdi');
		name.textContent = NAME;
		strong.append(name);
		link.append(strong);

		this.replaceChildren(label, ' ', link);
	}
}

if (typeof customElements !== 'undefined' && !customElements.get('developer-credit')) {
	customElements.define('developer-credit', DeveloperCredit);
}
