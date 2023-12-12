const mongoose = require('mongoose');
const Content = require('./../models/contentModel');

mongoose.connect("mongodb://127.0.0.1:27017/MoviePlay", {
    useNewUrlParser: true,
    useUnifiedTopology:true
    }).then(() => {
        console.log('Conexão bem-sucedida com o MongoDB');

        /*const filmes = [
            {
                id: '1',
                title: 'Divergente',
                year: new Date('2014-04-17'),
                category: 'Ação',
                synopsis: 'No futuro, uma menina adolescente aprende que é uma "divergente". Quando ela descobre um plan de uma líder maligna para assassinar todos os Divergentes, ela embarca em uma busca frenética para aprender a verdade sobre si mesma e por que a líder quer que ela seja morta.',
                price: 10.9,
                coverUrl: 'https://br.web.img3.acsta.net/c_310_420/pictures/14/02/18/21/20/583093.jpg'
            },
            {
                id: '2',
                title: 'Cisne Negro',
                year: new Date('2011-02-04'),
                category: 'Suspense',
                synopsis: 'Uma bailarina perde a compreensão da realidade quando uma sensual bailarina ameaça sua posição de dançarina protagonista em "O Lago dos Cisnes".',
                price: 10.9,
                coverUrl: 'https://images.squarespace-cdn.com/content/v1/58b866f417bffc4dc469acab/1625071246716-CW2SE2DZ7TIV99ZWV9W2/cisnenegro+poster.jpg'
            },
            {
                id: '3',
                title: 'A Barraca do Beijo',
                year: new Date('2018-05-11'),
                category: 'Romance',
                synopsis: 'O primeiro beijo de Elle vira um romance proibido com o garoto mais bonito do colégio, mas acaba colocando em risco a sua relação com seu melhor amigo.',
                price: 10.9,
                coverUrl: 'https://3.bp.blogspot.com/-EvTG1l7YfA4/WwVabBrDktI/AAAAAAAA_7U/yYVaCKNQHVk40DDdey2Zj4RzYheMSShfACLcBGAs/s1600/A%2BBarraca%2Bdo%2BBeijo.jpg'
            },
            {
                id: '4',
                title: 'Continência ao Amor',
                year: new Date('2022-07-29'),
                category: 'Romance',
                synopsis: 'Uma cantora se casa por conveniência com um militar que está prestes a ir para a guerra, mas uma tragédia transforma esse relacionamento de fachada em realidade.',
                price: 10.9,
                coverUrl: 'https://br.web.img3.acsta.net/pictures/22/08/09/21/09/3949781.jpg'
            },
            {
                id: '5',
                title: 'M : i : III',
                year: new Date('2006-05-04'),
                category: 'Ação',
                synopsis: 'Aposentado do serviço ativo e treinando recrutas para a Força Missão Impossível, o agente Ethan Hunt enfrenta o inimigo mais difícil de sua carreira: Owen Davian, um negociante internacional de armas e informação que é tão esperto quanto implacável. Davian surge para ameaçar Hunt e tudo o que ele mais estima, incluindo a mulher que tanto ama.',
                price: 10.9,
                coverUrl: 'https://media.fstatic.com/-EmsH_7pHxkJeer-xtpRgpJLPho=/322x478/smart/filters:format(webp)/media/movies/covers/2018/07/mission-impossible-iii-5217e3b9e38f6.jpg'
            },
            {
                id: '6',
                title: 'Jogos Vorazes',
                year: new Date('2012-03-23'),
                category: 'Ação',
                synopsis: 'Na região antigamente conhecida como América do Norte, a Capital de Panem controla 12 distritos e os força a escolher um garoto e uma garota, conhecidos como tributos, para competir em um evento anual televisionado. Todos os cidadãos assistem aos temidos jogos, no qual os jovens lutam até a morte, de modo que apenas um saia vitorioso. A jovem Katniss Everdeen, do Distrito 12, confia na habilidade de caça e na destreza com o arco, além dos instintos aguçados, nesta competição mortal.',
                price: 10.9,
                coverUrl: 'https://m.media-amazon.com/images/S/pv-target-images/703688eabf1aedeef790bb4a7bc8cea3fcc4a41f98d329ea1adf13cf7f33c890.png'
            },
            {
                id: '7',
                title: 'Barbie',
                year: new Date('2023-07-20'),
                category: 'Comédia',
                synopsis: 'Depois de ser expulsa da Barbieland por ser uma boneca de aparência menos do que perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.',
                price: 10.9,
                coverUrl: 'https://s2-marieclaire.glbimg.com/T_DX6ffqPGvmu5rvV2neO9uK1mM=/0x0:1382x2048/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_51f0194726ca4cae994c33379977582d/internal_photos/bs/2023/u/n/y0xBC1SIy2idfpVSornQ/barbie-posteres.jpg'
            },
            {
                id: '8',
                title: 'Invocação do Mal',
                year: new Date('2013-09-13'),
                category: 'Terror',
                synopsis: 'Os investigadores paranormais Ed e Lorraine Warren trabalham para ajudar a família aterrorizada por uma entidade demoníaca em sua fazenda.',
                price: 10.9,
                coverUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTleri04IXeyaOa5hRDq7zf_ERljtCSFOimWhon-8fLAwP6QUyuA21Vxux5sm0ADv75Qww&usqp=CAU'
            },
            {
                id: '9',
                title: 'Crepúsculo',
                year: new Date('2008-12-19'),
                category: 'Romance',
                synopsis: 'A estudante Bella Swan conhece Edward Cullen, um belo mas misterioso adolescente. Edward é um vampiro, cuja família não bebe sangue, e Bella, longe de ficar assustada, se envolve em um romance perigoso com sua alma gêmea imortal.',
                price: 10.9,
                coverUrl: 'https://m.media-amazon.com/images/I/41urNIlFA8L._AC_UF1000,1000_QL80_.jpg'
            },
            {
                id: '10',
                title: 'WALL-E',
                year: new Date('2008-06-27'),
                category: 'Animação',
                synopsis: 'Após entulhar a Terra de lixo e poluir a atmosfera com gases tóxicos, a humanidade deixou o planeta e passou a viver em uma gigantesca nave. O plano era que o retiro durasse alguns poucos anos, com robôs sendo deixados para limpar o planeta. WALL-E é o último destes robôs, e sua vida consiste em compactar o lixo existente no planeta. Até que um dia surge repentinamente uma nave, que traz um novo e moderno robô: Eva. A princípio curioso, WALL-E se apaixona e resolve segui-la por toda a galáxia.',
                price: 10.9,
                coverUrl: 'https://www.cafecomfilme.com.br/media/k2/items/cache/424a47d26101c371e8179dbd651fddc0_XL.jpg'
            },
            {
                id: '11',
                title: 'As Branquelas',
                year: new Date('2004-08-27'),
                category: 'Comédia',
                synopsis: 'Dois irmãos agentes do FBI, Marcus e Kevin Copeland, acidentalmente evitam que bandidos sejam presos em uma apreensão de drogas. Como castigo, eles são forçados a escoltar um par de socialites nos Hamptons. Quando as meninas descobrem o plano da agência, elas se recusam a ir. Sem opções, Marcus e Kevin, dois homens negros, decidem fingir que são as irmãs e se transformam em um par de loiras.',
                price: 10.9,
                coverUrl: 'https://assets.cinebelasartes.com.br/wp-content/uploads/2018/06/as-branquelas-min.jpg'
            },
            {
                id: '12',
                title: 'Annabelle',
                year: new Date('2014-10-09'),
                category: 'Terror',
                synopsis: 'John Form acha que encontrou o presente ideal para sua esposa grávida, uma boneca vintage. No entanto, a alegria do casal não dura muito. Uma noite terrível, membros de uma seita satânica invadem a casa do casal em um ataque violento. Ao tentarem invocar um demônio, eles mancham a boneca de sangue, tornando-a receptora de uma entidade do mal.',
                price: 10.9,
                coverUrl: 'https://upload.wikimedia.org/wikipedia/pt/9/9b/Annabelle-poster.jpg'
            },
            {
                id: '13',
                title: 'Carros',
                year: new Date('2006-06-30'),
                category: 'Animação',
                synopsis: 'Ao viajar para a Califórnia, o famoso carro de corridas Relâmpago McQueen se perde e vai parar em Radiator Springs, uma cidadezinha na Rota 66. Ele conhece novos amigos e aprende lições que mudam sua forma de encarar a vida.',
                price: 10.9,
                coverUrl: 'https://play-lh.googleusercontent.com/kHt8qbche40zkE6yZwA8IUe5ARINp4PjrJ5mi622GEzQFYWCaGTQDAl58rrRKRKyhnD2'
            },
            {
                id: '14',
                title: 'Pânico 5',
                year: new Date('2022-01-13'),
                category: 'Terror',
                synopsis: 'Vinte e cinco anos após uma série de crimes brutais chocar a tranquila Woodsboro, um novo assassino se apropria da máscara de Ghostface e começa a perseguir um grupo de adolescentes para trazer à tona segredos do passado mortal da cidade.',
                price: 10.9,
                coverUrl: 'https://cinepop.com.br/wp-content/uploads/2021/12/Pa%CC%82nico.jpg'
            },
            {
                id: '15',
                title: 'Minha Culpa',
                year: new Date('2023-06-08'),
                category: 'Romance',
                synopsis: 'Noah deixa sua cidade, namorado e amigas para se mudar para a mansão do novo marido da mãe. Lá conhece seu novo meio-irmão, Nick, e suas personalidades não batem desde o início. Mas a atração que sentem um pelo outro cresce imensamente.',
                price: 10.9,
                coverUrl: 'https://images.justwatch.com/poster/305772255/s332/culpa-mia'
            },
            {
                id: '16',
                title: 'IT - A Coisa',
                year: new Date('2017-09-07'),
                category: 'Terror',
                synopsis: 'Um grupo de crianças se une para investigar o misterioso desaparecimento de vários jovens em sua cidade. Eles descobrem que o culpado é Pennywise, um palhaço cruel que se alimenta de seus medos e cuja violência teve origem há vários séculos.',
                price: 10.9,
                coverUrl: 'https://br.web.img3.acsta.net/pictures/17/03/30/22/44/345288.jpg'
            },
            {
                id: '17',
                title: 'Cinderela',
                year: new Date('2015-03-26'),
                category: 'Romance',
                synopsis: 'A história acompanha a jovem Ella, cujo pai comerciante se casa novamente depois de ficar viúvo de sua mãe. Ansiosa para apoiá-lo, ela recebe bem a madrasta e suas filhas, Anastasia e Drisella, na nova casa. No entanto, quando seu pai morre subitamente, ela se vê à mercê de uma família cruel e invejosa. Trabalhando como empregada e agora chamada de Cinderela, ela começa a perder a esperança, mas uma fada madrinha provoca uma mudança em seu destino.',
                price: 10.9,
                coverUrl: 'https://vfilmesonline.net/wp-content/uploads/2020/02/npmaOKBbtFdZeeZn0Bz0YJgIoXw.jpg'
            },
            {
                id: '18',
                title: 'Gente Grande',
                year: new Date('2010-09-24'),
                category: 'Comédia',
                synopsis: 'A morte do treinador de basquete de infância de velhos amigos reúne a turma no mesmo lugar que celebraram um campeonato anos atrás. Os amigos, acompanhados de suas esposas e filhos, descobrem que idade não significa o mesmo que maturidade.',
                price: 10.9,
                coverUrl: 'https://br.web.img2.acsta.net/r_1280_720/pictures/210/299/21029996_20130821205722213.jpg'
            },
            {
                id: '19',
                title: 'Alerta Vermelho',
                year: new Date('2021-11-04'),
                category: 'Ação',
                synopsis: 'Um alerta vermelho da Interpol é emitido e o agente do FBI John Hartley assume o caso. Durante sua busca, ele se vê diante de um assalto ousado e é forçado a se aliar ao maior ladrão de arte da história, Nolan Booth, para capturar a ladra de arte mais procurada do mundo atualmente, Sarah Black.',
                price: 10.9,
                coverUrl: 'https://cinecriticas.com.br/wp-content/uploads/2021/12/Cine1-16.jpg'
            },
            {
                id: '20',
                title: 'M3GAN',
                year: new Date('2023-01-19'),
                category: 'Terror',
                synopsis: 'M3GAN é uma maravilha da inteligência artificial, uma boneca realista programada para ser a melhor amiga de uma criança. Uma robótica brilhante dá a sua jovem sobrinha um protótipo M3GAN, mas a máquina logo se torna violenta.',
                price: 10.9,
                coverUrl: 'https://play-lh.googleusercontent.com/yhdgTfK0Yt3_wvJBtasKAVHVJ2B9GjAodsJPkWwDwDRemt0rS36aj96VWGAEFlqyOyKe5qdY7JfHzKw4wlUg'
            },
            {
                id: '21',
                title: 'Rio',
                year: new Date('2011-04-08'),
                category: 'Comédia',
                synopsis: 'Capturada por contrabandistas de animais quando tinha acabado de nascer, a arara Blu nunca aprendeu a voar e vive uma vida domesticada feliz em Minnesota, nos Estados Unidos, com sua dona, Linda. Blu pensa que é a última arara de sua espécie. Mas quando descobrem que Jewel, uma fêmea, vive no Rio de Janeiro, Blu e Linda vão ao seu encontro. Os contrabandistas capturam Blu e Jewel, mas as aves escapam e começam uma aventura arriscada rumo à liberdade.',
                price: 10.9,
                coverUrl: 'https://criacria.files.wordpress.com/2012/05/capa-carlos-saldanha-rio.png'
            },
        ]

        Content.insertMany(filmes).then(() => {
            console.log('Filmes inseridos com sucesso!');
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Erro ao inserir filmes', err);
            mongoose.connection.close();
        })*/
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
});