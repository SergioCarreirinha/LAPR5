% Nós
no('Aguiar de Sousa', 'AGUIA', f, f, -8.4464785432391, 41.1293363229325).
no('Baltar', 'BALTR', t, f, -8.38716802227697, 41.1937898023744).
no('Besteiros', 'BESTR', f, f, -8.34043029659082, 41.217018845589).
no('Cete', 'CETE', t, f, -8.35164059584564, 41.183243425797).
no('Cristelo', 'CRIST', t, f, -8.34639896125324, 41.2207801252676).
no('Duas Igrejas', 'DIGRJ', f, f, -8.35481024956726, 41.2278665802794).
no('Estação (Lordelo)', 'ESTLO', f, t, -8.4227924957086, 41.2521157104055).
no('Estação (Paredes)', 'ESTPA', f, t, -8.33448520831829, 41.2082119860192).
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
linha('Cristelo_Baltar', nd0, ['CRIST', 'VCCAR', 'BALTR'], 8, 4000).
linha('Baltar_Cristelo', nd1, ['BALTR', 'VCCAR', 'CRIST'], 8, 4000).
linha('Sobrosa_Cete', 22, ['SOBRO', 'CRIST', 'BESTR', 'VCCAR', 'MOURZ', 'CETE'], 23, 11500).
linha('Sobrosa_Cete', 20, ['CETE', 'MOURZ', 'VCCAR', 'BESTR', 'CRIST', 'SOBRO'], 23, 11500).
linha('Estação(Lordelo)_Lordelo',34,['ESTLO','LORDL'], 2,1500).
linha('Lordelo_Estação(Lordelo)',35,['LORDL','ESTLO'], 2,1500).
linha('Estação(Lordelo)_Sobrosa',36,['ESTLO','SOBRO'], 5,1500).
linha('Sobrosa_Estação(Lordelo)',37,['SOBRO','ESTLO'], 5,1800).
linha('Estação(Paredes)_Paredes',38,['ESTPA','PARED'], 2,1500).
linha('Paredes_Estação(Paredes)',39,['PARED','ESTPA'], 2,1500).

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

%Gerador de todas as soluções com findall
plan_mud_mot(Noi,Nof,LCaminho_menostrocas):-
    get_time(Ti),
    findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
    menor(LLCaminho,LCaminho_menostrocas),
    get_time(Tf),
    length(LLCaminho,NSol),
    TSol is Tf-Ti,
    write('Numero de Solucoes:'),write(NSol),nl,
    write('Tempo de geracao da solucao:'),write(TSol),nl.

menor([H],H):-!.
menor([H|T],Hmenor):-menor(T,L1),length(H,C),length(L1,C1),
    ((C<C1,!,Hmenor=H);Hmenor=L1).


%Gerador de todas as soluções sem findall
:- dynamic melhor_sol_ntempo/2.
plan_mud_mot1(Noi,Nof,LCaminho_menostrocas):-
    get_time(Ti),
    (melhor_caminho(Noi,Nof);true),
    retract(melhor_sol_ntempo(LCaminho_menostrocas,_)),
    get_time(Tf),
    TSol is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(TSol),nl.

melhor_caminho(Noi,Nof):-
    asserta(melhor_sol_ntempo(_,86400)), % 24h = 86400 s
    caminho(Noi,Nof,LCaminho,TCaminho),
    atualiza_melhor(LCaminho,TCaminho),
    write(TCaminho),nl,
    fail.

caminho(Noi,Nof,LCaminho,T):-caminho(Noi,Nof,[],LCaminho,T).

caminho(No,No,Lusadas,Lfinal,_):-reverse(Lusadas,Lfinal).
caminho(No1,Nof,Lusadas,Lfinal,T):-
    liga(No1,No2,N),

    %verifica se é primeiro nó
    (primeiro_no(No1,Lusadas,T,N); true),
    %calcula tempo entre nos
    outros_nos(No2,T,N),

    \+member((_,_,N),Lusadas),
    \+member((No2,_,_),Lusadas),
    \+member((_,No2,_),Lusadas),
    caminho(No2,Nof,[(No1,No2,N)|Lusadas],Lfinal,T).

primeiro_no(No1,LUsadas,Tempo,Linha):-
    length(LUsadas,Tamanho),
    Tamanho == 0,
    outros_nos(No1,Tempo,Linha).

outros_nos(No2,Tempo,Linha):-
    linha(_,Linha,Per,_,_),
    nth1(Pos,Per,No2),
    horario(Linha,Horarios),
    nth1(Pos,Horarios,Hora),
    hora_inicio(HInicio),
    Hora>HInicio,
    Tempo is Tempo +(Hora-HInicio),
    %update da hora anterior
    retract(hora_inicio(_)),
    asserta(hora_inicio(Hora)).



atualiza_melhor(LCaminho,TCaminho):-
    melhor_sol_ntempo(_,N),
    TCaminho<N,retract(melhor_sol_ntempo(_,_)),
    asserta(melhor_sol_ntempo(LCaminho,TCaminho)).

:- dynamic hora_inicio/1.
melhor_caminho_tempo(H,Ni,Nf,Lc):-
    asserta(hora_inicio(H)),
    plan_mud_mot1(Ni,Nf,Lc),
    retract(hora_inicio(_)).
