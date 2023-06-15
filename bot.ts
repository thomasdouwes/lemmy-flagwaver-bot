import LemmyBot, { SortType, PostView, CommentView, SearchOptions } from 'lemmy-bot';
import { config } from 'dotenv';

config();
const { INSTANCE, USERNAME_OR_EMAIL, PASSWORD } =
  process.env as Record<string, string>;

//unholy RegEx for matching URL with image as the resource while seperated by space or newline or in markdown link EG [link1.com](link2.com) and only link2.com is matched
const file_regex = /(?<=^| |\()https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\/\b(?:[-a-zA-Z0-9()@:%_\+~#?&\/=]*)[-a-zA-Z0-9@:%_\+~#=]*\.(png|jpg|jpeg|gif|webp|mp4)(?=$| |\))/gim;

//RegEx for checking for imgur URL after not finding image URL
const imgur_regex = /^https?:\/\/(\w+\.)?imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?$/;

//RegEx for replying to comments
const reply_regex = /!(wave)/i

//URL for CORS proxy //TODO change it!
const cors_proxy = 'https://corsproxy.io/?'

//community config
let vexillology: SearchOptions = {instance: 'lemmy.world', name: 'vexillology'};
let vexillologycirclejerk: SearchOptions = {instance: 'lemmy.antemeridiem.xyz', name: 'vexillologyjerk'};
let testcommunity: string = "test";

//very ugly .env checking
console.log("Running bot with variables:");
if(INSTANCE) { 
	console.log('Instance:', INSTANCE);
}
else { 
	console.error('INSTANCE not set');
}
if(USERNAME_OR_EMAIL) { 
	console.log('Username:', USERNAME_OR_EMAIL);
}
else { 
	console.error('USERNAME_OR_EMAIL not set');
}
if(PASSWORD) {
	//console.log('Password:', PASSWORD);
	console.log('Password: Redacted')
}
else { 
	console.error('PASSWORD not set');
}

function wave()
{
	//TODO deduplicate wavePost and waveComment
}

function wavePost(post: PostView["post"])
{
	var matches = [];
	var match;
	var iter = 0;
	var body: string;
	//get link from post URL
	if (file_regex.test(post.url!))
	{
		matches[0] = post.url!;
		iter++;
		file_regex.lastIndex = 0;
	}
	//get links from post body
	while ((match = file_regex.exec(post.body!)) !== null) {
		matches[iter] = match[0];
		iter++;
	}
	//one link
	if (matches.length == 1)
	{
		const url = cors_proxy + encodeURIComponent(matches[0]);
		const flagwave_url = 'https://krikienoid.github.io/flagwaver/#?src=' + encodeURIComponent(url);
		body = "Here you go: [Link](" + flagwave_url + ")\n\n*****\n\nBeep Boop I'm a bot. Maintained by Thomas Douwes  \nDid I get something wrong? if so please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
	}
	//multiple links
	else if (matches.length > 1)
	{
		body = "Here you go:  \n"
		var iter = 1;
		matches.forEach( (link) => {
			const url = cors_proxy + encodeURIComponent(link);
			const flagwave_url = 'https://krikienoid.github.io/flagwaver/#?src=' + encodeURIComponent(url);
			body += "[Link " + iter + "](" + flagwave_url + ")  \n";
			iter++;
		});
		body += "\n*****\n\nBeep Boop I'm a bot. Maintained by Thomas Douwes  \nDid I get something wrong? if so please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
	}
	//no links
	else
	{
		if(imgur_regex.test(post.url!) || imgur_regex.test(post.body!))
		{
			body = "It looks like the post links to imgur but I couldn't find an image in the URL. I don't currently support imgur albums or indirect links.";
		}
		else
		{
			body = "Sorry! the post does not seem to have image!  \nIf that is incorrect please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
		}
	}
	return body;
}

function waveComment(comment: CommentView["comment"])
{
	var matches = [];
	var match;
	var iter = 0;
	var body: string;
	//get links from post body
	while ((match = file_regex.exec(comment.content!)) !== null) {
		matches[iter] = match[0];
		iter++;
	}
	//one link
	if (matches.length == 1)
	{
		const url = cors_proxy + encodeURIComponent(matches[0]);
		const flagwave_url = 'https://krikienoid.github.io/flagwaver/#?src=' + encodeURIComponent(url);
		body = "Here you go: [Link](" + flagwave_url + ")\n\n*****\n\nBeep Boop I'm a bot. Maintained by Thomas Douwes  \nDid I get something wrong? if so please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
	}
	//multiple links
	else if (matches.length > 1)
	{
		body = "Here you go:  \n"
		var iter = 1;
		matches.forEach( (link) => {
			const url = cors_proxy + encodeURIComponent(link);
			const flagwave_url = 'https://krikienoid.github.io/flagwaver/#?src=' + encodeURIComponent(url);
			body += "[Link " + iter + "](" + flagwave_url + ")  \n";
			iter++;
		});
		body += "\n*****\n\nBeep Boop I'm a bot. Maintained by Thomas Douwes  \nDid I get something wrong? if so please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
	}
	//no links
	else
	{
		if(imgur_regex.test(comment.content!))
		{
			body = "It looks like the comment links to imgur but I couldn't find an image in the URL. I don't currently support imgur albums or indirect links.";
		}
		else
		{
			body = "Sorry! the comment does not seem to have image!  \nIf that is incorrect please message [@thomas@lemmy.douwes.co.uk](/u/thomas@lemmy.douwes.co.uk)";
		}
	}
	return body;
}

const bot = new LemmyBot({
	instance: INSTANCE,
	credentials: {
		username: USERNAME_OR_EMAIL,
		password: PASSWORD
	},
	connection: {
		minutesUntilReprocess: 10,
		secondsBetweenPolls: 10
	},
	federation: 'all',
	//federation: {
	//  allowList: [
	//    {
	//	  instance: 'lemmy.world',
	//	  communities: ['vexillology']
	//    },
	//    {
	//	  instance: 'lemmy.antemeridiem.xyz',
	//	  communities: ['vexillologyjerk']
	//    }
	//  ]
	//},
	//federation: 'local',
	dbFile: 'db.sqlite3',
	handlers: {
		async comment ({
			commentView: { comment },
			botActions: { createComment, getUserId, getParentOfComment, getCommunityId, getPost },
			preventReprocess
		}) {
			//get the user ID of the bot so it dosn't reply to itself
			const bot_id = await getUserId(USERNAME_OR_EMAIL);
			let communities: Array<number> = [await getCommunityId(vexillology) as number, await getCommunityId(vexillologycirclejerk) as number, await getCommunityId(testcommunity) as number];
			if (communities.includes((await getPost(comment.post_id)).community.id))
			{
				if (comment.creator_id != bot_id && bot_id !== undefined) {
					if (reply_regex.test(comment.content)) {
						console.log("comment matched RegEx, responding");
						const { type, data } = await getParentOfComment(comment);
						if (type === 'post')
						{
							const { post } = data as PostView;
							var body = wavePost(post);
						}
						else if (type === 'comment')
						{
							const { comment } = data as CommentView;
							var body = waveComment(comment);
						}
						else
						{
							var body = "I don't know how to reply to this type of post";
						}
						createComment({
							postId: comment.post_id,
							parentId: comment.id,
							content: body
						});
						preventReprocess();
					}
				}
				else
				{
					preventReprocess();
				}
			}
			else
			{
				preventReprocess();
			}
		},
		async post ({
			postView: { post },
			botActions: { createComment, getUserId, getCommunityId },
			preventReprocess
		}) {
			let communities: Array<number> = [await getCommunityId(vexillology) as number, await getCommunityId(vexillologycirclejerk) as number, await getCommunityId(testcommunity) as number];
			if (communities.includes(post.community_id))
			{
				if (reply_regex.test(post.body!) || reply_regex.test(post.name)) {
					console.log("post matched RegEx, responding")
					var body = wavePost(post);
				}
				else
				{
					preventReprocess();
				}
			}
		},
		async mention ({
			mentionView: { comment },
			botActions: { createComment, getUserId, getParentOfComment, getCommunityId, getPost },
			preventReprocess
		}) {
			console.log("was metioned by comment ID " + comment.id + " in community " + (await getPost(comment.post_id)).community.name);
			if (reply_regex.test(comment.content)) {
				console.log("mention matched RegEx, responding");
				const { type, data } = await getParentOfComment(comment);
				if (type === 'post')
				{
					const { post } = data as PostView;
					var body = wavePost(post);
				}
				else if (type === 'comment')
				{
					const { comment } = data as CommentView;
					var body = waveComment(comment);
				}
				//WTF?
				else
				{
					var body = "I don't know how to reply to this type of post";
				}
				createComment({
					postId: comment.post_id,
					parentId: comment.id,
					content: body
				});
				preventReprocess();
			}
		}
	}
});

bot.start()
