no('Aguiar de Sousa', 'AGUIA', t, f, -8.4464785432391, 41.1293363229325).
no('Baltar', 'BALTR', t, f, -8.38716802227697, 41.1937898023744).
no('Besteiros', 'BESTR', t, f, -8.34043029659082, 41.217018845589).
no('Cete', 'CETE', t, f, -8.35164059584564, 41.183243425797).
no('Cristelo', 'CRIST', t, f, -8.34639896125324, 41.2207801252676).
no('Duas Igrejas', 'DIGRJ', t, f, -8.35481024956726, 41.2278665802794).
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

no('no1','NO1',t,f,0,0).
no('no2','NO2',t,f,1,1).
no('no3','NO3',t,f,2,2).

linha('Paredes_Aguiar', 1, ['AGUIA','NO1', 'RECAR','NO3','NO2', 'PARAD', 'CETE', 'PARED'], 31, 15700).
linha('Paredes_Aguiar', 3, ['PARED', 'CETE','PARAD','NO2','NO3', 'RECAR','NO1', 'AGUIA'], 31, 15700).
linha('Paredes_Gandra', 5 , ['GAND', 'VANDO', 'BALTR', 'MOURZ','NO2', 'PARED'], 26, 13000).
linha('Paredes_Gandra', 8, ['PARED','NO2', 'MOURZ', 'BALTR', 'VANDO', 'GAND'], 26, 13000).
linha('Paredes_Lordelo', 9, ['LORDL','VANDO','NO1', 'BALTR', 'MOURZ', 'PARED'], 29, 14300).
linha('Paredes_Lordelo', 11, ['PARED','MOURZ', 'BALTR','NO1', 'VANDO', 'LORDL'], 29, 14300).
linha('Lordelo_Parada', 24, ['LORDL', 'DIGRJ','NO3', 'CRIST', 'VCCAR', 'BALTR', 'PARAD'], 22, 11000).
linha('Lordelo_Parada', 26, ['PARAD', 'BALTR', 'VCCAR', 'CRIST','NO3', 'DIGRJ', 'LORDL'], 22, 11000).
linha('Cristelo_Baltar', nd0, ['CRIST', 'VCCAR', 'BALTR'], 8, 4000).
linha('Baltar_Cristelo', nd1, ['BALTR', 'VCCAR', 'CRIST'], 8, 4000).
linha('Sobrosa_Cete', 22, ['SOBRO', 'CRIST','NO3', 'BESTR', 'VCCAR', 'MOURZ','NO2', 'CETE'], 23, 11500).
linha('Sobrosa_Cete', 20, ['CETE','NO2', 'MOURZ', 'VCCAR', 'BESTR', 'CRIST','NO3', 'SOBRO'], 23, 11500).
linha('Estação(Lordelo)_Lordelo',34,['ESTLO','LORDL'], 2,1500).
linha('Lordelo_Estação(Lordelo)',35,['LORDL','ESTLO'], 2,1500).
linha('Estação(Lordelo)_Sobrosa',36,['ESTLO','SOBRO'], 5,1500).
linha('Sobrosa_Estação(Lordelo)',37,['SOBRO','ESTLO'], 5,1800).
linha('Estação(Paredes)_Paredes',38,['ESTPA','PARED'], 2,1500).
linha('Paredes_Estação(Paredes)',39,['PARED','ESTPA'], 2,1500).

linha('NO1_NO2',40,['NO1','ESTPA','NO3','MOURZ','NO2'],1,1).
linha('NO2_NO1',41,['NO2','MOURZ','NO3','ESTPA','NO1'],1,1).


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


caminho(Noi,Nof,LCaminho):-caminho(Noi,Nof,[],LCaminho).
caminho(No,No,Lusadas,Lfinal):-reverse(Lusadas,Lfinal).
caminho(No1,Nof,Lusadas,Lfinal):-
    liga(No1,No2,N),
    \+member((_,_,N),Lusadas),
    \+member((No2,_,_),Lusadas),
    \+member((_,No2,_),Lusadas),
    caminho(No2,Nof,[(No1,No2,N)|Lusadas],Lfinal).


plan_mud_mot(Noi,Nof,LCaminho_menostrocas):-
    get_time(Ti),
    findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
    menor(LLCaminho,LCaminho_menostrocas),
    get_time(Tf),
    length(LLCaminho,NSol),
    TSol is Tf-Ti,
    write('Numero de Solucoes:'),write(NSol),nl,
    write('Tempo de geracao da solucao:'),write(TSol),nl.


:- dynamic melhor_sol_ntrocas/2.
plan_mud_mot1(Noi,Nof,LCaminho_menostrocas):-
    get_time(Ti),
    (melhor_caminho(Noi,Nof);true),
    retract(melhor_sol_ntrocas(LCaminho_menostrocas,_)),
    get_time(Tf),
    TSol is Tf-Ti,
    write('Tempo de geracao da solucao:'),write(TSol),nl.

melhor_caminho(Noi,Nof):-
    asserta(melhor_sol_ntrocas(_,10000)),
    caminho(Noi,Nof,LCaminho),
    atualiza_melhor(LCaminho),
    fail.

atualiza_melhor(LCaminho):-
    melhor_sol_ntrocas(_,N),
    length(LCaminho,C),
    C<N,retract(melhor_sol_ntrocas(_,_)),
    asserta(melhor_sol_ntrocas(LCaminho,C)).

menor_ntrocas(Noi,Nof,LCaminho_menostrocas):-
    findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
    menor(LLCaminho,LCaminho_menostrocas).

menor([H],H):-!.
menor([H|T],Hmenor):-menor(T,L1),length(H,C),length(L1,C1),
    ((C<C1,!,Hmenor=H);Hmenor=L1).
