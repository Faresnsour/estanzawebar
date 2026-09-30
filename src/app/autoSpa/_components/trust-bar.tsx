import { brand } from "../_data/packages";
import s from "../auto-spa.module.css";

export function TrustBar() {
  return (
    <div className={s.trustBar} aria-label="معلومات المركز">
      <div>
        <span className={s.statusDot} aria-hidden="true" />
        <span>المعبيلة الصناعية 8 · مسقط</span>
      </div>

      <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer">
        أعمال المركز على Instagram <span aria-hidden="true">↗</span>
      </a>

      <div>
        <span className={s.trustSymbol} aria-hidden="true">＋</span>
        <span>طلب واضح · تأكيد مباشر من الفريق</span>
      </div>
    </div>
  );
}