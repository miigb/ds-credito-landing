import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade e proteção de dados pessoais da " +
    siteConfig.legalName +
    " (DS Crédito Setúbal Vitória), em conformidade com o RGPD.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/privacidade`,
  },
};

export default function PrivacidadePage() {
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao início
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-accent-700 uppercase mb-3">
            Transparência &amp; Proteção de Dados
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-brand-600 text-sm">
            Última atualização: 19 de março de 2026 &middot; Em conformidade com
            o Regulamento (UE) 2016/679 (RGPD)
          </p>
        </header>

        <div className="space-y-10 text-brand-600 leading-relaxed">

          {/* 1. Responsável pelo tratamento */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              1. Responsável pelo Tratamento
            </h2>
            <p className="mb-3">
              O responsável pelo tratamento dos seus dados pessoais é:
            </p>
            <ul className="space-y-1 ml-4 list-none">
              <li>
                <span className="font-semibold text-brand-800">Denominação social:</span>{" "}
                {siteConfig.legalName}
              </li>
              <li>
                <span className="font-semibold text-brand-800">Nome comercial:</span>{" "}
                {siteConfig.name}
              </li>
              <li>
                <span className="font-semibold text-brand-800">Sede:</span> {address}
              </li>
              <li>
                <span className="font-semibold text-brand-800">E-mail:</span>{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand-800">Telefone:</span>{" "}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand-800">
                  Registo no Banco de Portugal:
                </span>{" "}
                Intermediário de Crédito{" "}
                <a
                  href={siteConfig.regulation.registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  Nº {siteConfig.regulation.registrationNumber}
                </a>
              </li>
            </ul>
          </section>

          {/* 2. Dados recolhidos */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              2. Dados Pessoais Recolhidos
            </h2>
            <p className="mb-3">
              Através dos formulários disponíveis neste website, podemos recolher
              as seguintes categorias de dados pessoais:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Dados de identificação e contacto:
                  </span>{" "}
                  nome completo, endereço de correio eletrónico e número de
                  telefone.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Dados profissionais:
                  </span>{" "}
                  perfil do titular (trabalhador por conta de outrem, trabalhador
                  independente, reformado, outro).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Dados financeiros indicativos:
                  </span>{" "}
                  montante de crédito pretendido, tipo de crédito (habitação,
                  consumo), prazo desejado e montante de entrada disponível.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Conteúdo da mensagem:
                  </span>{" "}
                  qualquer informação adicional que o titular opte por partilhar
                  no campo de mensagem livre.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Dados técnicos:
                  </span>{" "}
                  país de origem da ligação, obtido através de geolocalização por
                  endereço IP (serviço{" "}
                  <span className="font-medium">ipapi.co</span>), utilizado
                  exclusivamente para pré-selecionar o idioma da página.
                </span>
              </li>
            </ul>
            <p className="mt-3 text-sm bg-brand-50 border border-brand-200 rounded-lg p-3">
              Não recolhemos categorias especiais de dados pessoais (dados de
              saúde, dados biométricos, etc.) nem dados de menores de 18 anos.
            </p>
          </section>

          {/* 3. Finalidade */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              3. Finalidade do Tratamento
            </h2>
            <p className="mb-3">
              Os dados pessoais recolhidos são tratados para as seguintes
              finalidades:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  Responder a pedidos de informação e contacto submetidos através
                  dos formulários do website.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  Prestar o serviço de intermediação de crédito, incluindo a
                  análise preliminar do pedido e o encaminhamento para as
                  instituições de crédito adequadas.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  Gerir a relação pré-contratual e contratual com o titular, no
                  âmbito da intermediação de crédito à habitação e ao consumo.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  Adaptar o idioma de apresentação do website com base na
                  localização geográfica aproximada do visitante (via IP).
                </span>
              </li>
            </ul>
            <p className="mt-3">
              Os dados não serão utilizados para tomadas de decisão
              exclusivamente automatizadas com efeitos jurídicos significativos,
              nem para fins de definição de perfis (<em>profiling</em>).
            </p>
          </section>

          {/* 4. Base legal */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              4. Base Legal do Tratamento
            </h2>
            <p className="mb-3">
              O tratamento dos seus dados pessoais assenta nas seguintes bases
              legais previstas no artigo 6.º do RGPD:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Consentimento [art. 6.º, n.º 1, al. a)]:
                  </span>{" "}
                  ao submeter qualquer formulário deste website, o titular
                  assinala expressamente uma caixa de verificação declarando que
                  leu e aceita a presente política de privacidade e que consente
                  no tratamento dos seus dados para os fins indicados. O
                  consentimento pode ser retirado a qualquer momento, sem
                  prejuízo da licitude do tratamento efetuado com base no
                  consentimento previamente dado.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Execução de diligências pré-contratuais [art. 6.º, n.º 1,
                    al. b)]:
                  </span>{" "}
                  o tratamento é necessário para responder ao pedido de
                  informação e, caso o titular pretenda avançar, para a
                  preparação de proposta de intermediação de crédito.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Interesses legítimos [art. 6.º, n.º 1, al. f)]:
                  </span>{" "}
                  a geolocalização por IP para seleção de idioma constitui um
                  interesse legítimo que não prejudica os direitos e liberdades
                  fundamentais do titular.
                </span>
              </li>
            </ul>
          </section>

          {/* 5. Destinatários */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              5. Destinatários e Subcontratantes
            </h2>
            <p className="mb-3">
              Os seus dados pessoais podem ser partilhados com as seguintes
              entidades, na estrita medida do necessário:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">Web3Forms</span>{" "}
                  (subcontratante de processamento de formulários) — plataforma
                  utilizada para encaminhar as submissões dos formulários para o
                  correio eletrónico do responsável pelo tratamento. A Web3Forms
                  atua exclusivamente como subcontratante e processa os dados de
                  acordo com as instruções do responsável. Consulte a política de
                  privacidade da Web3Forms em{" "}
                  <a
                    href="https://web3forms.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                  >
                    web3forms.com/privacy
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">ipapi.co</span>{" "}
                  — serviço de geolocalização por endereço IP utilizado para
                  determinar o país de origem do visitante e pré-selecionar o
                  idioma da página. O endereço IP é transmitido a este serviço
                  no momento do carregamento da página. Consulte a política de
                  privacidade em{" "}
                  <a
                    href="https://ipapi.co/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                  >
                    ipapi.co/privacy
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Instituições de crédito parceiras
                  </span>{" "}
                  — caso o titular pretenda avançar com um processo de
                  intermediação, os seus dados serão partilhados com as
                  instituições financeiras relevantes, sendo o titular informado
                  previamente e recolhido o consentimento específico para esse
                  efeito.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Vercel Analytics
                  </span>{" "}
                  — plataforma de análise de desempenho do website que processa
                  dados de forma anonimizada. Não são armazenados cookies de
                  rastreamento para este efeito.
                </span>
              </li>
            </ul>
            <p className="mt-3">
              Não vendemos, cedemos nem comercializamos os seus dados pessoais a
              terceiros para fins de marketing ou publicidade.
            </p>
          </section>

          {/* 6. Prazo de conservação */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              6. Prazo de Conservação
            </h2>
            <p className="mb-3">
              Os dados pessoais são conservados pelo período estritamente
              necessário para as finalidades que motivaram a sua recolha:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  Os dados submetidos através dos formulários são conservados por
                  um período máximo de{" "}
                  <span className="font-semibold text-brand-800">2 (dois) anos</span>{" "}
                  a contar da data da submissão, salvo se o titular retirar o
                  consentimento antes ou se o processo de intermediação der
                  origem a uma relação contratual, caso em que se aplicam os
                  prazos legais de conservação específicos (designadamente, os
                  previstos no Decreto-Lei n.º 81-C/2017 e legislação
                  complementar).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  A preferência de idioma armazenada em{" "}
                  <span className="font-mono text-sm bg-brand-100 px-1 rounded">
                    localStorage
                  </span>{" "}
                  permanece no dispositivo do utilizador até que este limpe os
                  dados do browser, não sendo transmitida para os nossos
                  servidores.
                </span>
              </li>
            </ul>
          </section>

          {/* 7. Direitos do titular */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              7. Direitos do Titular dos Dados
            </h2>
            <p className="mb-3">
              Nos termos do RGPD (artigos 15.º a 22.º), o titular dos dados tem
              os seguintes direitos, que pode exercer a qualquer momento:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito de acesso (art. 15.º):
                  </span>{" "}
                  obter confirmação sobre se os seus dados são tratados e, em
                  caso afirmativo, aceder aos mesmos e a informações sobre o
                  tratamento.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito de retificação (art. 16.º):
                  </span>{" "}
                  solicitar a correção de dados inexatos ou incompletos.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito ao apagamento / &ldquo;direito a ser esquecido&rdquo; (art.
                    17.º):
                  </span>{" "}
                  solicitar a eliminação dos seus dados, quando estes já não
                  sejam necessários para a finalidade que justificou a sua
                  recolha ou quando retire o consentimento, sem que haja outra
                  base legal que justifique o tratamento.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito à limitação do tratamento (art. 18.º):
                  </span>{" "}
                  solicitar a restrição do tratamento dos seus dados em
                  determinadas circunstâncias.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito à portabilidade dos dados (art. 20.º):
                  </span>{" "}
                  receber os dados que forneceu num formato estruturado, de uso
                  corrente e de leitura automática, e transmiti-los a outro
                  responsável pelo tratamento.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito de oposição (art. 21.º):
                  </span>{" "}
                  opor-se ao tratamento dos seus dados por razões relacionadas
                  com a sua situação particular, quando o tratamento se baseie
                  em interesses legítimos.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-semibold text-brand-800">
                    Direito de retirar o consentimento:
                  </span>{" "}
                  retirar o consentimento a qualquer momento, sem que isso
                  comprometa a licitude do tratamento efetuado com base no
                  consentimento anteriormente dado.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm bg-accent-50 border border-accent-200 rounded-lg p-3 text-brand-700">
              Para exercer qualquer um destes direitos, contacte-nos por correio
              eletrónico para{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-700 hover:text-accent-600 font-semibold underline underline-offset-2 transition-colors"
              >
                {siteConfig.email}
              </a>
              . Responderemos no prazo máximo de 30 dias a contar da receção do
              pedido.
            </p>
          </section>

          {/* 8. Cookies e localStorage */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              8. Cookies e Armazenamento Local
            </h2>
            <p className="mb-3">
              Este website tem uma política de cookies minimalista. Não utilizamos
              cookies de rastreamento, cookies de publicidade nem cookies de
              terceiros para fins analíticos identificativos.
            </p>
            <h3 className="text-base font-semibold text-brand-800 mt-4 mb-2">
              localStorage
            </h3>
            <p className="mb-2">
              O website armazena no{" "}
              <span className="font-mono text-sm bg-brand-100 px-1 rounded">
                localStorage
              </span>{" "}
              do seu browser a seguinte informação:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-accent-700 font-bold mt-0.5">•</span>
                <span>
                  <span className="font-mono text-sm bg-brand-100 px-1 rounded">
                    locale
                  </span>{" "}
                  — preferência de idioma selecionada pelo utilizador
                  (&ldquo;pt&rdquo; ou &ldquo;en&rdquo;). Esta informação permanece
                  exclusivamente no seu dispositivo e não é transmitida para
                  quaisquer servidores externos.
                </span>
              </li>
            </ul>

            <h3 className="text-base font-semibold text-brand-800 mt-4 mb-2">
              Geolocalização por IP
            </h3>
            <p>
              Quando visita o website pela primeira vez (ou se não tiver
              preferência de idioma guardada), o website consulta o serviço{" "}
              <span className="font-medium">ipapi.co</span> para determinar o
              seu país de origem com base no endereço IP. Esta informação é usada
              apenas para pré-selecionar o idioma mais adequado ao seu perfil e
              não é armazenada nos nossos sistemas. O endereço IP é processado
              pela ipapi.co de acordo com a sua própria política de privacidade.
            </p>
          </section>

          {/* 9. Contacto DPO */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              9. Encarregado de Proteção de Dados (DPO)
            </h2>
            <p className="mb-3">
              Dada a dimensão e natureza das atividades de tratamento, a{" "}
              {siteConfig.legalName} não está obrigada à designação formal de um
              Encarregado de Proteção de Dados ao abrigo do artigo 37.º do RGPD.
              Contudo, quaisquer questões relacionadas com a proteção de dados
              pessoais podem ser endereçadas diretamente ao responsável pelo
              tratamento através dos seguintes contactos:
            </p>
            <ul className="space-y-1 ml-4 list-none">
              <li>
                <span className="font-semibold text-brand-800">E-mail:</span>{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand-800">Telefone:</span>{" "}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand-800">Morada:</span>{" "}
                {address}
              </li>
            </ul>
          </section>

          {/* 10. Reclamação CNPD */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              10. Direito de Reclamação junto da Autoridade de Controlo
            </h2>
            <p className="mb-3">
              Sem prejuízo de qualquer outra via de recurso administrativo ou
              judicial, o titular tem o direito de apresentar reclamação junto
              da autoridade de controlo competente em Portugal:
            </p>
            <ul className="space-y-1 ml-4 list-none">
              <li>
                <span className="font-semibold text-brand-800">Entidade:</span>{" "}
                Comissão Nacional de Proteção de Dados (CNPD)
              </li>
              <li>
                <span className="font-semibold text-brand-800">Morada:</span>{" "}
                Av. D. Carlos I, 134, 1.º, 1200-651 Lisboa
              </li>
              <li>
                <span className="font-semibold text-brand-800">E-mail:</span>{" "}
                <a
                  href="mailto:geral@cnpd.pt"
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  geral@cnpd.pt
                </a>
              </li>
              <li>
                <span className="font-semibold text-brand-800">Website:</span>{" "}
                <a
                  href="https://www.cnpd.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                >
                  www.cnpd.pt
                </a>
              </li>
            </ul>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-4 pb-2 border-b border-brand-200">
              11. Alterações à Política de Privacidade
            </h2>
            <p>
              A presente política de privacidade pode ser atualizada
              periodicamente para refletir alterações nas práticas de tratamento
              de dados, nos serviços prestados ou na legislação aplicável. A data
              de última atualização é indicada no topo deste documento. Em caso de
              alterações substanciais, procuraremos notificar os titulares de
              dados cujas informações de contacto estejam na nossa posse.
              Recomendamos a consulta periódica desta página.
            </p>
          </section>
        </div>

        {/* Footer of the page */}
        <div className="mt-12 pt-8 border-t border-brand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-brand-400">
            {siteConfig.legalName} &middot; Intermediário de Crédito Nº{" "}
            {siteConfig.regulation.registrationNumber} &middot; Banco de Portugal
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent-700 hover:text-accent-600 transition-colors font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao início
          </Link>
        </div>
      </main>
    </div>
  );
}
