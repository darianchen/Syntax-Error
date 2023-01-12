json.votes do 
    @votes.each do |vote|
        json.set! vote.id do
            json.extract! vote, :id, :post_id, :voter_id, :vote
        end
    end
end