% Nós
no('Aguiar de Sousa', 'AGUIA', t, f, -8.4464785432391, 41.1293363229325).
no('Baltar', 'BALTR', t, f, -8.38716802227697, 41.1937898023744).
no('Besteiros', 'BESTR', f, f, -8.34043029659082, 41.217018845589).
no('Cete', 'CETE', t, f, -8.35164059584564, 41.183243425797).
no('Cristelo', 'CRIST', t, f, -8.34639896125324, 41.2207801252676).
no('Duas Igrejas', 'DIGRJ', f, f, -8.35481024956726, 41.2278665802794).
no('Gandra', 'GAND', f, f, -8.43958765792976, 41.1956579348384).
no('Lordelo', 'LORDL', t, f, -8.42293614720057, 41.2452627470645).
no('Mouriz', 'MOURZ', t, f, -8.36577272258403, 41.1983610215263).
no('Parada de Todeia', 'PARAD', t, f, -8.37023578802149, 41.1765780321068).
no('Paredes', 'PARED', t, f, -8.33566951069481, 41.2062947118362).
no('Recarei', 'RECAR', f, f, -8.42215867462191, 41.1599363478137).
no('Sobrosa', 'SOBRO', t, f, -8.38118071581788, 41.2557331783506).
no('Vandoma', 'VANDO', t, f, -8.34160692293342, 41.2328015719913).
no('Vila Cova de Carros', 'VCCAR', t, f, -8.35109395257277, 41.2090666564063).

% Linhas
linha('Paredes_Aguiar', 1, ['AGUIA', 'RECAR', 'PARAD', 'CETE', 'PARED'], 31, 15700).
linha('Paredes_Aguiar', 3, ['PARED', 'CETE','PARAD', 'RECAR', 'AGUIA'], 31, 15700).
linha('Paredes_Gandra', 5 , ['GAND', 'VANDO', 'BALTR', 'MOURZ', 'PARED'], 26, 13000).
linha('Paredes_Gandra', 8, ['PARED', 'MOURZ', 'BALTR', 'VANDO', 'GAND'], 26, 13000).
linha('Paredes_Lordelo', 9, ['LORDL','VANDO', 'BALTR', 'MOURZ', 'PARED'], 29, 14300).
linha('Paredes_Lordelo', 11, ['PARED','MOURZ', 'BALTR', 'VANDO', 'LORDL'], 29, 14300).
linha('Lordelo_Parada', 24, ['LORDL', 'DIGRJ', 'CRIST', 'VCCAR', 'BALTR', 'PARAD'], 22, 11000).
linha('Lordelo_Parada', 26, ['PARAD', 'BALTR', 'VCCAR', 'CRIST', 'DIGRJ', 'LORDL'], 22, 11000).
linha('Sobrosa_Cete', 22, ['SOBRO', 'CRIST', 'BESTR', 'VCCAR', 'MOURZ', 'CETE'], 23, 11500).
linha('Sobrosa_Cete', 20, ['CETE', 'MOURZ', 'VCCAR', 'BESTR', 'CRIST', 'SOBRO'], 23, 11500).

% Horários
horario(1,[36000,36540,36840,37140,37620]).
horario(1,[37800,38340,38640,38940,39420]).
horario(1,[39600,40140,40440,40740,41220]).

horario(3,[73800,74280,74580,74880,75420]).
horario(3,[72900,73380,73680,73980,74520]).
horario(3,[72000,72480,72780,73080,73620]).

horario(5,[30360,30960,31200,31440,31920]).
horario(5,[33960,34560,34800,35040,35520]).
horario(5,[37560,38160,38400,38640,39120]).

horario(8,[28860,29340,29580,29820,30360]).
horario(8,[32400,32880,33120,33360,33960]).
horario(8,[36000,36480,36720,36960,37560]).

horario(9,[29160,29940,30180,30420,30900]).
horario(9,[30060,30840,31080,31320,31800]).
horario(9,[30960,31740,31980,32220,32700]).

horario(11,[27420,27900,28140,28380,29160]).
horario(11,[28320,28800,29040,29280,30060]).
horario(11,[29220,29700,29940,30180,30960]).

horario(20,[30180,30480,30720,30960,31320,31560]).
horario(20,[31380,31680,31920,32160,32520,32760]).
horario(20,[32580,32880,33120,33360,33720,33960]).
horario(20,[80000,80100,80200,80300,80400,80500]).

horario(22,[34800,35040,35400,35640,35880,36180]).
horario(22,[33600,33840,34200,34440,34680,34980]).
horario(22,[32400,32640,33000,33240,33480,33780]).

horario(24,[26700,27000,27240,27480,27720,28020]).
horario(24,[72900,73200,73440,73680,73920,74420]).
horario(24,[71580,71880,72120,72360,72600,72900]).

horario(26,[33600,33900,34140,34380,34620,34920]).
horario(26,[32280,32580,32820,33060,33300,33600]).
horario(26,[30960,31260,31500,31740,31980,32280]).

:-dynamic liga/3.
gera_ligacoes:- retractall(liga(_,_,_)),
    findall(_,
      ((no(_,No1,t,f,_,_);no(_,No1,f,t,_,_)),
      (no(_,No2,t,f,_,_);no(_,No2,f,t,_,_)),
      No1\==No2,
      linha(_,N,LNos,_,_),
      ordem_membros(No1,No2,LNos),
      assertz(liga(No1,No2,N))
),_).

ordem_membros(No1,No2,[No1|L]):- member(No2,L),!.
ordem_membros(No1,No2,[_|L]):- ordem_membros(No1,No2,L).

calcular_tempo(Act,X,Linha, HoraInicial, HoraParagem):-
    proximo_horario_no(Linha,Act,HoraI),
    proximo_horario_no(Linha,X,HoraParagem),
    HoraI>=HoraInicial,
    HoraI=<HoraParagem.

proximo_horario_no(Linha,No,Horario):-
    linha(_,Linha,Per,_,_),
    nth1(Pos,Per,No),              % posicao do no na linha
    horario(Linha,Horarios),       % horarios da lina
    nth1(Pos,Horarios,Horario),!.  % hora do no em questao


bestfs(Orig,Dest,Cam,HoraInicial, HoraChegada):-
    bestfs2(Dest,(HoraInicial,[Orig]),Cam,HoraChegada).

bestfs2(Dest,(Hora,[Dest|T]),Cam,Hora):-
    !,
    reverse([Dest|T],Cam).

bestfs2(Dest,(HoraInicial,LA),Cam,HoraChegada):-
    LA=[Act|_],
    findall((EstX,CaX,[X|LA]),
    (liga(Act,X,CX),\+member(X,LA),estimativa(X,Dest,EstX),
    calcular_tempo(Act,X,CX, HoraInicial, HoraParagem),
    CaX is HoraParagem),Novos),
    sort(Novos,NovosOrd),
    NovosOrd = [(_,CM,Melhor)|_],
    bestfs2(Dest,(CM,Melhor),Cam,HoraChegada).

estimativa(No1,No2, Estimativa):-
    no(_,No1,_,_,Lat1,Long1),
    no(_,No2,_,_,Lat2,Long2),
    % ref to : http://users.on.br/jlkm/geopath/
    Graus is pi / 180,
    Arco is acos(sin(Lat1*Graus)*sin(Lat2*Graus) + cos(Lat1*Graus)*cos(Lat2*Graus)*cos(Long2*Graus-Long1*Graus)) * 6371000,
    Estimativa is Arco/8.89. % 8.89 = velocidade media de um veiculo.