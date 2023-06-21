<script runat="server" language="javascript">
   Platform.Load("Core", "1.1.1") {/* Platform Library Version */}
   var mid = Attribute.GetValue('memberid'); {/* BU Identifier */}
   {/* var callID = Platform.Function.GUID(); GUID for unique identifier */}

   {/* Grabs RSSF and MID */}
   var rssfeed = Platform.Function.Lookup('ENT.Weather Content Data - ACTIVE','stationRSS','mid',mid);

   {/* Grabs Header Names & Values */} 
   var headerNames = ["user-agent"];
   var headerValues = ["Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"];

   {/* Sets RSSFeed */}
   var xml = HTTP.Get(rssfeed, headerNames, headerValues);
   {/* Sets RSSFeed to String */}
   var xml1 = String(xml.Content);

   {/* var api = new Script.Util.WSProxy(); */}

   {/* Build DE Object */}
   var updateObject = {
      CustomerKey: '59CED7D7-71EA-4DB6-A29A-A9C009D7D04A',
      Properties: [
         {
            Name: 'mid',
            Value: mid
         },
         {
            Name: 'timeStamp',
            Value: Platform.Function.Now()
         },
         {
            Name: 'RSSFeed',
            Value: xml1
         }
      ]
   };

   var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

   var rssDE = DataExtension.Init("ENT.Weather RSSFeed - ACTIVE");
   rssDE.Rows.Update({RSSFeed:xml1}, ["mid"], [mid]);
   rssDE.Rows.Update({timeStamp:Date.now()}, ["mid"], [mid]);
</script>