
    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','总经理', '83492851', '13926069657', '660001','bzg@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '白振国' 
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');
    

    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','总经理', '83492851', '13808873191', '660000','llh@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '李炼红' 
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');
    

    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','经理助理', '83579104', '13825006028', '660201','cxx@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '柴新霞' 
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','技术应用总监', '', '15013110369', '660321','zk@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '赵凯'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','项目总监', '', '18928892247', '','wsp@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '伍水平'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','', '', '13802727579', '','',''
        from IPEMPS
        where FEMPNM = '吴祖宜'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','', '83499681', '18814383246', '','fengjw@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '冯嘉伟'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','会计', '83595871', '13622274342', '','',''
        from IPEMPS
        where FEMPNM = '邓小鸿'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','出纳', '83595871', '13826489404', '660806','',''
        from IPEMPS
        where FEMPNM = '李利丽'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','财务助理', '', '15626095894', '','',''
        from IPEMPS
        where FEMPNM = '马源镁'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','UI', '', '18028548530', '','cpb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '梁宇萍'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'002','UI', '', '19876190912', '','cpc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '廖诗磊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','副经理', '', '15886435665', '','chenzf@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '陈泽夫'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '13229841127', '','zjbf@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '谢胜祥'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '15627931266', '','ybc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄桂珣'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '13729346342', '','ybd@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '胡立浩'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '18814400903', '','ybf@gdzyxx.com ',''
        from IPEMPS
        where FEMPNM = '罗越雄'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '19860209991', '','ybb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '林浩浩'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'004','', '', '13526508022', '','zjba@gdzyxx.com','郑州'
        from IPEMPS
        where FEMPNM = '贾仁泊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','副总经理', '83596070', '13922416769', '662001','cgz@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '曹观钊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13414948761', '','eba@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '曹尚湖'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '18670059951', '','ebi@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '彭洁娟'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '18814271913', '','ebk@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '李嘉健'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13560228830', '668830','hss@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄山松'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '18530063882', '','ebc@gdzyxx.com','郑州'
        from IPEMPS
        where FEMPNM = '王寒冰'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13285555259', '','yansj@gdzyxx.com','合肥'
        from IPEMPS
        where FEMPNM = '严善金'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '18756093523', '','ebd@gdzyxx.com','合肥'
        from IPEMPS
        where FEMPNM = '汪李冬'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '15682039561', '','ebf@gdzyxx.com','[object Object]'
        from IPEMPS
        where FEMPNM = '赵中菠'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13015538134', '','fujj@gdzyxx.com','郑州'
        from IPEMPS
        where FEMPNM = '付九杰'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13696863923', '','ebg@gdzyxx.com','福州'
        from IPEMPS
        where FEMPNM = '杨旭'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '19855378688', '','ebl@gdzyxx.com','南京'
        from IPEMPS
        where FEMPNM = '蔡梦梦'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '15967317567', '','ebe@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '毛哲熙'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '15836080669', '','ebh@gdzyxx.com','郑州'
        from IPEMPS
        where FEMPNM = '绳笑洁'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'005','', '', '13360903729', '','ebm@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '涂杨'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'006','', '', '13620418757', '','',''
        from IPEMPS
        where FEMPNM = '李灿'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','经理', '83495869', '13922447545', '660206','zj@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '朱杰'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '18613233735', '','sibc@gdzyxx.com','四川总队'
        from IPEMPS
        where FEMPNM = '王剑'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '13402847082', '','sibd@gdzyxx.com','成都支队'
        from IPEMPS
        where FEMPNM = '何超'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '18081894755', '','sibe@gdzyxx.com','四川总队'
        from IPEMPS
        where FEMPNM = '李海波'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '15928901963', '','sibi@gdzyxx.com','四川总队'
        from IPEMPS
        where FEMPNM = '张鹏'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '83596113', '17878928084', '','sibk@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '石远昌'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '17278567463
', '','sibj@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '凌珊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '19158848637', '','sibf@gdzyxx.com','四川支队'
        from IPEMPS
        where FEMPNM = '赵珊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '15815306307', '','sibm@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '周树楷'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '19989089313', '','sibn@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '沈成才'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '16607626834', '','sibo@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '张晓东'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'008','', '', '15887968262', '','sibl@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '王濒樊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','经理', '', '13602892231', '660796','liangjh@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '梁家辉'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','副经理', '83593900', '18813974547', '','lhy@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '李华有'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13699709927', '','wba@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄光诚'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '17846664919', '','wbc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '甘积湛'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13536707370', '','wbh@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄彩花'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13692487542', '','wbi@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '鲁浩萍'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13826654542', '','wbb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '何竞锋'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13824949285', '','wbg@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '廖鸿鹏'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'011','', '', '13710313422', '','sbc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄泽洪'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','副经理', '', '15920322922', '','zjbg@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '白娟'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '13189320065', '','zjbe@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '曾燃亮'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '17825408145', '','lbb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '梁淼莹'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '13712451934', '','',''
        from IPEMPS
        where FEMPNM = '廖智杰'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '13544586075', '660617','siba@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '张桂荣'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '13560289006', '','',''
        from IPEMPS
        where FEMPNM = '李月泉'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'014','', '', '1880668792', '','',''
        from IPEMPS
        where FEMPNM = '关菲燕'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','经理', '', '13922284276', '660601','dsj@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '丁书军'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '83579104', '13640281604', '','zjbc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '胡燕'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '83596113', '13751742135', '660302','cgd@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '陈高德'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '', '13724554848', '','sibg@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '卢武晴'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '', '18377889070', '','yba@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '唐瞻龙'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '', '13640690674', '','',''
        from IPEMPS
        where FEMPNM = '吴胜娴'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'015','', '', '13435176877', '','',''
        from IPEMPS
        where FEMPNM = '黄瑞意'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','技术总监', '', '13288832138', '','fhm@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '符浩明'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','', '', '18814121370', '','hxa@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '陈怡光'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','', '', '13631327411', '','wbe@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '张彬'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','', '', '13642314387', '','hxb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '谢隽彤'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','', '', '15274053690', '','',''
        from IPEMPS
        where FEMPNM = '许益龙'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'009','', '', '13342710969', '','',''
        from IPEMPS
        where FEMPNM = '郭泽玮'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'012','', '', '18189870621', '','',''
        from IPEMPS
        where FEMPNM = '朱玉'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'012','', '', '19927539862', '','cpe@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '陈吉虹'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'012','', '', '17620930205', '','cpg@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄俊鸿'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'012','', '', '13570514585', '','',''
        from IPEMPS
        where FEMPNM = '郭可莹'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'013','副总经理', '', '13500024699', '660301','xgj@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '徐国江'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'013','', '', '15918403202', '','cpa@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '李浩文'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'013','', '', '16620187505', '','dkha@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '吴安冬'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'010','经理', '83595805', '13922415786', '660101','zyj@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '赵玉俊'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'010','', '', '13922416529', '660603','yq@gdzyxx.com','成都区域'
        from IPEMPS
        where FEMPNM = '杨强'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'010','', '', '13611462062', '','tgb@gdzyxx.com','广东区域'
        from IPEMPS
        where FEMPNM = '陈善威'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'010','', '', '13808829109', '','tgc@gdzyxx.com','北方区域'
        from IPEMPS
        where FEMPNM = '白佳祥'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'010','', '', '15119884589', '','',''
        from IPEMPS
        where FEMPNM = '陈泽华'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','经理', '83596113', '13416300242', '660164','susm@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '苏思敏'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','', '', '13609751672', '','zca@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '赖淑玲'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','', '', '17728138818', '','zcd@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '吴婉怡'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','', '', '13266247150', '','zcc@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '李清泓'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','', '', '13434839999', '','zce@gdzyxx.com ',''
        from IPEMPS
        where FEMPNM = '梁颖彤'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'003','', '', '13570583050', '','zcb@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '黄鹤樑'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','经理', '83499681', '15625088569', '','phf@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '庞华芬'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','项目质控', '83596091', '15088098567', '660410','chf@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '柴换芳'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','行政专员', '83499681', '15986341168', '','cyh@gdzyxx.com','采购、认证、档案'
        from IPEMPS
        where FEMPNM = '陈颖慧'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','行政前台', '83596091', '15800255133', '','yxy@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '杨晓怡'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','行政司机', '', '18312663317', '','',''
        from IPEMPS
        where FEMPNM = '任俊彪'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');


    insert into KQ_TBS_CONTACTS(fempid, fdptno, flevel, fcompanytel, fmobile, fshortnum, femail, fremark)
      (select fempid,'001','人事助理', '83492430', '15907530880', '','hra@gdzyxx.com',''
        from IPEMPS
        where FEMPNM = '丘巧婷'
        and hii.KQ_JUDGE_USER_FIFVALID(FEMPID) = 'TRUE');