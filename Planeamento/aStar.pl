aStar(Orig,Dest,Cam,HoraChegada):-
    aStar2(Dest,[(_,HoraInicial,[Orig])],Cam,HoraChegada).
    %ENVIARSOLUÇÃO

aStar2(Dest,[(_,HoraInicial,[Dest|T])|_],Cam,Hora):-
    reverse([Dest|T],Cam).

aStar2(Dest,[(_,HoraInicial,LA)|Outros],Cam,Hora):-
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edges(Act,X,N),\+member(X,LA),
      calcularTempoAStar(Act,X,N, HoraInicial, HoraParagem)
      CaX is HoraParagem, estimativa(X,Dest,EstX),
      CEX is CaX + EstX),Novos),
    append(Outros,Novos,Todos),
    sort(Todos,TodosOrd),
    aStar2(Dest,TodosOrd,Cam,HoraChegada).

estimativa(No1,No2, Estimativa):-
    No(_,No1,_,_,Lat1,Long1),
    No(_,No2,_,_,Lat2,Long2),
    Estimativa is sqrt((Lat1-Lat2)^2 + (Y1-Y2)^2).

calcularTempoAStar(Act, X, Linha, HoraInicial, HoraParagem):-
    linha(_,Linha,Per,_,_),
    nth1(PosA,Per,Act),
    nth1(PosX,Per,X),
    horario(Linha,Horarios),
    nth1(PosA,Horarios,HoraA),
    nth1(PosX,Horarios,HoraX),
    HoraInicial<HoraA,
    HoraA<HoraX, 
    HoraParagem is HoraX.


bestfs(Orig,Dest,HoraInicial,Cam,HoraChegada):-
    bestfs2(Dest,(HoraInicial,[Orig]),Cam,HoraChegada).

bestfs2(Dest,(HoraInicial,[Dest|T]),Cam,HoraChegada):- !,
    reverse([Dest|T],Cam).

bestfs2(Dest,(HoraInicial,LA),Cam,HoraChegada):-
    LA=[Act|_],
    findall((EstX,CaX,[X|LA]),
    (edge(Act,X,N),\+member(X,LA),
    calcularTempoAStar(Act, X, N, HoraInicial, HoraParagem),
    CaX is HoraParagm),estimativa(X,Dest,EstX),Novos),
    sort(Novos,NovosOrd),
    NovosOrd = [(_,CM,Melhor)|_],
    bestfs2(Dest,(CM,Melhor),Cam,Custo)