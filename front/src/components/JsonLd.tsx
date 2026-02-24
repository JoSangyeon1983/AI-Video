/* ============================================
   JSON-LD 구조화 데이터 컴포넌트
   ─ 모든 페이지에서 반복되는 JSON-LD <script> 태그를 단일 컴포넌트로 관리
   ============================================ */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

/** Schema.org JSON-LD 구조화 데이터를 <script> 태그로 렌더링 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
