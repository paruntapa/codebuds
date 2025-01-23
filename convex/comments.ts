import { v } from "convex/values";
import { mutation } from "./_generated/server";

// add a new comment
export const addComment = mutation({
    args: {
      interviewId: v.id("interviews"),
      content: v.string(),
      rating: v.number(),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Unauthorized");
  
      return await ctx.db
      .insert("comments", {
        interviewId: args.interviewId,
        content: args.content,
        rating: args.rating,
        interviewerId: identity.subject,
      });
    },
  });

  // get all comments for an interview
  export const getComments = mutation({
    args: {
        interviewId: v.id("interviews")
    },
    handler: async(ctx, args)=> {
        const comments = await ctx.db
        .query("comments")
        .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
        .collect()

        return comments
    }
  });