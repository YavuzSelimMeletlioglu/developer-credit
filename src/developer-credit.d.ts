export declare const NAME: string;
export declare const PROFILE_URL: string;
export declare const LABELS: Record<'tr' | 'en' | 'de' | 'ru' | 'ar', string>;
export declare function resolveLang(value?: string | null): keyof typeof LABELS;
export declare function dirOf(lang: string): 'ltr' | 'rtl';

export declare class DeveloperCredit extends HTMLElement {
	static observedAttributes: string[];
}

declare global {
	interface HTMLElementTagNameMap {
		'developer-credit': DeveloperCredit;
	}
}
