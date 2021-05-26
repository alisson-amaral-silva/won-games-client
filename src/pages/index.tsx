import Home from 'templates/Home'
export default function Index() {
  return <Home />
}

  // Static => gerar estático em build time
export function getStaticProps(){
  // faz lógica
  // pode ser buscar dados de API
  // fazer calculo| leitura de context


  // retorno dos dados

}

//ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONA EM PAGES
// CASO TENTE CHAMAR DENTRO DE COMPONENTS OU TEMPLATES, NÃO ROLA
