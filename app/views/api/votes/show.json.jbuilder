# json.votes do 
#     @votes.each do |vote|
#         json.set! vote.id do
#             json.extract! vote, :id, :post_id, :voter_id, :vote, :post_type
#         end
#     end
# end

json.vote do
    json.extract! @vote, :id, :vote, :post_id, :voter_id, :post_type
end