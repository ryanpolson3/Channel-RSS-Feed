<script runat="server" language="javascript">
Platform.Load("Core", "1.1.1")
var mid = Attribute.GetValue('memberid');
var rssfeed = Platform.Function.Lookup('ENT.Weather Content Data - ACTIVE','stationRSS','mid',mid);
var headerNames = ["user-agent"];
var headerValues = ["Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"];
var xml = HTTP.Get(rssfeed, headerNames, headerValues);
var xml1 = String(xml.Content);
var rssDE = DataExtension.Init("ENT.Weather RSSFeed - ACTIVE");
rssDE.Rows.Update({RSSFeed:xml1}, ["mid"], [mid]);
rssDE.Rows.Update({timeStamp:Date.now()}, ["mid"], [mid]);
</script>