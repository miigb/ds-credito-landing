import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Termos e condições de utilização do website da " +
    siteConfig.legalName +
    ".",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/termos`,
  },
};

export default function TermosPage() {
  const address = `${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}, Portugal`;

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-brand-50 border-b border-brand-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent-700 hover:text-accent-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao site
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-brand-900 mb-2">
          Termos e Condições de Utilização
        </h1>
        <p className="text-brand-500 text-sm mb-10">
          Última atualização: abril de 2026
        </p>

        <div className="prose prose-brand max-w-none text-brand-700 leading-relaxed space-y-8">
          {/* 1. Identificação */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              1. Identificação da Entidade
            </h2>
            <p>
              O presente website é propriedade e operado por{" "}
              <strong>{siteConfig.legalName}</strong>, com sede em {address},
              adiante designada por &ldquo;Letraperfeiçoada&rdquo; ou &ldquo;nós&rdquo;.
            </p>
            <p className="mt-2">
              A Letraperfeiçoada é um intermediário de crédito vinculado, registado
              no {siteConfig.regulation.regulator} com o número{" "}
              <a
                href={siteConfig.regulation.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-700 underline underline-offset-2"
              >
                {siteConfig.regulation.registrationNumber}
              </a>
              , integrado na rede {siteConfig.parentOrganization}.
            </p>
            <p className="mt-2">
              Tipos de crédito autorizados: {siteConfig.regulation.creditTypes.join(" e ")}.
              Sem vínculo de exclusividade com qualquer instituição financeira.
            </p>
            <p className="mt-2">
              Serviços de intermediação de crédito autorizados pelo Banco de Portugal:
            </p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Apresentação ou proposta de contratos de crédito a consumidores;</li>
              <li>
                Assistência a consumidores, mediante a realização de atos preparatórios
                ou de outros trabalhos de gestão pré-contratual relativamente a contratos
                de crédito que não tenham sido por si apresentados ou propostos;
              </li>
              <li>Celebração de contratos de crédito com consumidores em nome dos mutuantes.</li>
            </ul>
            <p className="mt-2">
              <strong>Serviços de Consultoria: {siteConfig.regulation.consultancyServices ? "SIM" : "NÃO"}.</strong>
            </p>
          </section>

          {/* 2. Objeto */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              2. Objeto
            </h2>
            <p>
              Os presentes Termos e Condições regulam o acesso e utilização do
              website{" "}
              <a
                href={siteConfig.url}
                className="text-accent-700 underline underline-offset-2"
              >
                {siteConfig.url.replace("https://", "")}
              </a>{" "}
              (doravante &ldquo;Website&rdquo;), incluindo todas as páginas, conteúdos,
              funcionalidades e serviços nele disponibilizados.
            </p>
            <p className="mt-2">
              Ao aceder e utilizar este Website, o utilizador aceita, sem reservas,
              os presentes Termos e Condições. Caso não concorde com alguma das
              disposições, deverá abster-se de utilizar o Website.
            </p>
          </section>

          {/* 3. Serviços */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              3. Serviços Prestados
            </h2>
            <p>
              A Letraperfeiçoada atua como intermediário de crédito, prestando os
              seguintes serviços:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Pré-análise de viabilidade financeira para aquisição de imóveis</li>
              <li>Comparação de ofertas de crédito de múltiplas instituições financeiras parceiras</li>
              <li>Gestão documental completa do processo de crédito</li>
              <li>Negociação bancária para obtenção das melhores condições</li>
              <li>Acompanhamento integral do processo até à escritura</li>
              <li>Apoio a clientes residentes e não residentes</li>
            </ul>
            <p className="mt-2">
              Os serviços de intermediação de crédito são prestados sem qualquer
              custo direto para o cliente. A Letraperfeiçoada é remunerada pelas
              instituições financeiras com as quais colabora.
            </p>
          </section>

          {/* 4. Propriedade intelectual */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              4. Propriedade Intelectual
            </h2>
            <p>
              Todos os conteúdos presentes no Website — incluindo textos, imagens,
              fotografias, gráficos, logótipos, ícones, marcas, designações
              comerciais, software e demais elementos — são propriedade da
              Letraperfeiçoada ou dos respetivos titulares de direitos, encontrando-se
              protegidos pela legislação aplicável em matéria de propriedade
              intelectual e industrial.
            </p>
            <p className="mt-2">
              É expressamente proibida a reprodução, distribuição, modificação,
              transmissão ou utilização dos conteúdos do Website, no todo ou em
              parte, sem autorização prévia e escrita da Letraperfeiçoada.
            </p>
          </section>

          {/* 5. Informação disponibilizada */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              5. Informação Disponibilizada
            </h2>
            <p>
              A informação constante no Website é disponibilizada a título
              meramente informativo, não constituindo qualquer forma de
              aconselhamento financeiro, jurídico ou fiscal.
            </p>
            <p className="mt-2">
              A Letraperfeiçoada envidará os melhores esforços para manter a
              informação atualizada e rigorosa, mas não garante a inexistência de
              erros, imprecisões ou omissões, nem a adequação da informação a
              finalidades específicas do utilizador.
            </p>
            <p className="mt-2">
              As simulações e estimativas apresentadas no Website têm carácter
              indicativo e não vinculativo, podendo as condições finais de crédito
              variar em função da análise efetuada pelas instituições financeiras.
            </p>
          </section>

          {/* 6. Limitação de responsabilidade */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              6. Limitação de Responsabilidade
            </h2>
            <p>
              A Letraperfeiçoada não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Erros, interrupções, falhas ou indisponibilidade do Website</li>
              <li>Danos diretos ou indiretos resultantes do acesso ou utilização do Website</li>
              <li>Presença de vírus ou outros elementos nocivos que possam causar alterações nos sistemas informáticos dos utilizadores</li>
              <li>Decisões tomadas com base na informação disponibilizada no Website</li>
              <li>Conteúdos de websites de terceiros acessíveis através de hiperligações</li>
            </ul>
            <p className="mt-2">
              A utilização do Website é feita por conta e risco do utilizador.
            </p>
          </section>

          {/* 7. Proteção de dados */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              7. Proteção de Dados Pessoais
            </h2>
            <p>
              O tratamento de dados pessoais recolhidos através do Website é
              efetuado em conformidade com o Regulamento Geral sobre a Proteção de
              Dados (RGPD) e demais legislação aplicável. Para informação detalhada
              sobre o tratamento dos seus dados pessoais, consulte a nossa{" "}
              <Link
                href="/privacidade"
                className="text-accent-700 underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              8. Cookies
            </h2>
            <p>
              O Website utiliza cookies e tecnologias de armazenamento local para
              garantir o seu correto funcionamento, melhorar a experiência de
              navegação e analisar padrões de utilização. O utilizador pode gerir
              as suas preferências de cookies a qualquer momento através das
              definições do seu navegador.
            </p>
            <p className="mt-2">
              Para mais informações, consulte a nossa{" "}
              <Link
                href="/privacidade"
                className="text-accent-700 underline underline-offset-2"
              >
                Política de Privacidade e Cookies
              </Link>
              .
            </p>
          </section>

          {/* 9. Ligações externas */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              9. Ligações a Websites Externos
            </h2>
            <p>
              O Website pode conter hiperligações para websites de terceiros. Estas
              ligações são disponibilizadas apenas para conveniência do utilizador,
              não implicando qualquer aprovação, associação ou responsabilidade da
              Letraperfeiçoada relativamente ao conteúdo, políticas de privacidade
              ou práticas desses websites.
            </p>
          </section>

          {/* 10. Reclamações */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              10. Reclamações
            </h2>
            <p>
              Os clientes e utilizadores podem apresentar reclamações através dos
              seguintes meios:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent-700 underline underline-offset-2"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                Livro de Reclamações Eletrónico:{" "}
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline underline-offset-2"
                >
                  www.livroreclamacoes.pt
                </a>
              </li>
              <li>
                {siteConfig.regulation.regulator}:{" "}
                <a
                  href="https://www.bportugal.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline underline-offset-2"
                >
                  www.bportugal.pt
                </a>
              </li>
            </ul>
          </section>

          {/* 11. Alterações */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              11. Alterações aos Termos e Condições
            </h2>
            <p>
              A Letraperfeiçoada reserva-se o direito de, a qualquer momento e sem
              aviso prévio, alterar, atualizar ou modificar os presentes Termos e
              Condições. As alterações produzem efeitos a partir da data da sua
              publicação no Website. A utilização continuada do Website após a
              publicação das alterações implica a aceitação dos novos termos.
            </p>
          </section>

          {/* 12. Lei aplicável */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">
              12. Lei Aplicável e Foro Competente
            </h2>
            <p>
              Os presentes Termos e Condições regem-se pela legislação portuguesa.
              Para a resolução de quaisquer litígios emergentes da interpretação ou
              aplicação dos presentes termos, será competente o foro da comarca de
              Setúbal, com expressa renúncia a qualquer outro.
            </p>
          </section>

          {/* Contact info */}
          <section className="mt-12 p-6 bg-brand-50 rounded-xl border border-brand-100">
            <h2 className="text-lg font-bold text-brand-900 mb-3">
              Contactos
            </h2>
            <div className="space-y-1 text-sm">
              <p><strong>{siteConfig.legalName}</strong></p>
              <p>{address}</p>
              <p>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-accent-700 underline underline-offset-2">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                Telefone:{" "}
                <a href={`tel:${siteConfig.phone}`} className="text-accent-700 underline underline-offset-2">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                Registo Banco de Portugal:{" "}
                <a
                  href={siteConfig.regulation.registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 underline underline-offset-2"
                >
                  Nº {siteConfig.regulation.registrationNumber}
                </a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
